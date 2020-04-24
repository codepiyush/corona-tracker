import React from 'react';
import Map from './map'

class App extends React.Component {
  render() {
    return (
      <div>
        <nav className="md-whiteframe-4dp">
          Covid Track
        </nav>

        <div className="main">
          <div className="map">
            <Map />
          </div>
          <div className="data">
            
          </div>
        </div>
      </div>
    )
  }
}
export default App