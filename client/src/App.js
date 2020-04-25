import React from 'react';
import Map from './map'
import DataDisplay from './datadisplay';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';




const allData = gql`
  {
    all(sort:{field:totalCases,order:DESC}){
      country
      cases {
        new
        recovered
        total
      }
      deaths{
        new
        total
      }
    }
  }
`

function App() {

  const { loading, error, data } = useQuery(allData)
  if (loading) return (
    <div className="loading-main">
      <div className="loading-icons">
        <div> <img src={require('./assets/1.png')} alt="" /> </div>
        <div><img src={require('./assets/2.png')} alt="" /></div>
        <div><img src={require('./assets/3.png')} alt="" /></div>
        <div><img src={require('./assets/4.png')} alt="" /></div>
        <div><img src={require('./assets/5.png')} alt="" /></div>
      </div>
      <div className="loading-text">
        Updating Data ...
      </div>
    </div>

  )
  if (error) return <p>Error</p>

  // console.log(data)
  return (
    <div>
      <nav className="md-whiteframe-4dp">
        Covid Track
      </nav>

      <div className="main">
        <div className="map">
          <Map data={data.all} />
        </div>
        <div className="data">
          <DataDisplay data={data.all} />
        </div>
      </div>
      <footer className="md-whiteframe-2dp">
        Data from <a href="https://www.worldometers.info/coronavirus/"> WorldoMeter </a>
      </footer>
    </div>
  )
}
export default App