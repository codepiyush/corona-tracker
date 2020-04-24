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
  if (loading) return <p>Loading.....</p>
  if (error) return <p>Error</p>

  // console.log(data)
  return (
    <div>
      <nav className="md-whiteframe-4dp">
        Covid Track
      </nav>

      <div className="main">
        <div className="map">
          <Map data={data.all}/>
        </div>
        <div className="data">
          <DataDisplay data={data.all} />
        </div>
      </div>
    </div>
  )
}
export default App