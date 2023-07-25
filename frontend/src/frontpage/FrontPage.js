import React, {useState, useEffect} from 'react'
import './FrontPage.css'
import VehicleCard from '../vehiclecard/VehicleCard.js'
import BoatDetail from '../vehiclecarddetail/BoatDetail'
import CarDetail from '../vehiclecarddetail/CarDetail'
import MotoDetail from '../vehiclecarddetail/MotoDetail'
import RvDetail from '../vehiclecarddetail/RvDetail'
import TrailerDetail from '../vehiclecarddetail/Trailerdetail'

const FrontPage = ({currentUser}) => {
  const [listings, setListings] = useState();
  const [detailedView, setDetailedView] = useState({active:false,vehicle:{}});
  const [filterText, setFilterText] = useState('')

  // function vehicleFilterStorage(name, value) {
  //   if (sessionStorage.getItem(name)) {
  //     console.log('This filter is already saved')
  //   } else {
  //     sessionStorage.setItem(name, value)
  //   }
  // }

  function vehicleFilterRetrieve(name) {
    if (!sessionStorage.getItem(name)) {
      return ''
    } else {
      return sessionStorage.getItem(name)
    }
  }
  useEffect(() => {
    fetch('http://localhost:3001/listings')
      .then(res => res.json())
      .then(data => setListings(data))
  }, [])

  return (
    <div id='frontPageContainer'>
      <div id='flexfrontpagetop'>
        <div>
          <input type='search' placeholder='Search...' />
        </div>
        <div>
          {currentUser.success ? <>Home Base: {currentUser.base}</> : <>Log in to see your base!</>}
        </div>3px 3px 3px rgba(79, 32, 13, .8)
      </div>

      <div id='resultsfilter'>

      <div className='listContainer'>
          <>
          {detailedView.active ?
          <>
            <div id='detailedViewContainerOverlay'>
              <div id='detailedViewContainer'>
                {(detailedView.vehicle?.type === 'car'||detailedView.vehicle?.type === 'coupe'||detailedView.vehicle?.type === 'truck')?<CarDetail vehicle={detailedView.vehicle}/>:<></>}
                {(detailedView.vehicle.type === 'boat'||detailedView.vehicle?.type === 'jet ski')?<BoatDetail vehicle={detailedView.vehicle}/>:<></>}
                {(detailedView.vehicle.type === 'Street Bike'||detailedView.vehicle?.type === 'Dirt Bike'||detailedView.vehicle?.type === 'Cruiser'||detailedView.vehicle?.type === "Sport Bike"||detailedView.vehicle?.type === "Touring Bike"||detailedView.vehicle?.type === "Adventure Bike"||detailedView.vehicle?.type === "Dual Sport")?<MotoDetail vehicle={detailedView.vehicle}/>:<></>}
                {(detailedView.vehicle.type === 'motorized'||detailedView.vehicle.type === 'towable')?<RvDetail vehicle={detailedView.vehicle}/>:<></>}
                {(detailedView.vehicle.type === 'flatbed'||detailedView.vehicle.type === 'enclosed')?<TrailerDetail vehicle={detailedView.vehicle}/>:<></>}
                <div id='returnButtonContainer'> 
                  <button onClick={() => { setDetailedView({ active: false, vehicle: {} }) }}>Go Back</button>
                </div>
              </div>
            </div>
          </> : <></>}
            {listings?.carListings.filter(car=>!(car.sold)).map(car => <VehicleCard vehicle={car} detailedView={detailedView} setDetailedView={setDetailedView}/>)}
            {listings?.boatListings.filter(boat=>!(boat.sold)).map(boat => <VehicleCard vehicle={boat} detailedView={detailedView} setDetailedView={setDetailedView}/>)}
            {listings?.rvListings.filter(rv=>!(rv.sold)).map(rv => <VehicleCard vehicle={rv} detailedView={detailedView} setDetailedView={setDetailedView}/>)}
            {listings?.motoListings.filter(moto=>!(moto.sold)).map(moto => <VehicleCard vehicle={moto} detailedView={detailedView} setDetailedView={setDetailedView}/>)}
            {listings?.trailerListings.filter(trailer=>!(trailer.sold)).map(trailer => <VehicleCard vehicle={trailer} detailedView={detailedView} setDetailedView={setDetailedView}/>)}
          </>
      </div>

      <div>
        <div>Filters</div>
        <label for="vehicle" id='vehiclefilter'>Vehicle: </label>
        <select
          name="vehicle"
          id="vehicleSelect"
          defaultValue={vehicleFilterRetrieve('vehiclefilter')}
          onChange={(e) => {
            sessionStorage.setItem('vehiclefilter', e.target.value)
            switch(e.target.value) {
              case 'car':
                setFilterText('car')
                sessionStorage.setItem('vehiclefilter', e.target.value)
                break;
              case 'boat':
                setFilterText('boat')
                sessionStorage.setItem('vehiclefilter', e.target.value)
                break;
              case 'motorcycle':
                setFilterText('motorcycle')
                sessionStorage.setItem('vehiclefilter', e.target.value)
                break;
              case 'rv':
                setFilterText('rv')
                sessionStorage.setItem('vehiclefilter', e.target.value)
                break;
              case 'trailer':
                setFilterText('trailer')
                sessionStorage.setItem('vehiclefilter', e.target.value)
                break;
              default:
                setFilterText('')
            }
          }}
          > 
          <option value='' default disabled>Please select an option</option>
          <option value="car">Car</option>
          <option value="boat">Boat</option>
          <option value="motorcycle">Motorcycle</option>
          <option value="rv">RV</option>
          <option value="trailer">Trailer</option>
        </select>

        <div>
          {vehicleFilterRetrieve('vehiclefilter') === 'car' ?
          <>Car Selected
            <div>Make</div>
            <div>Model</div>
            <div>Year</div>
            <div>Type</div>
            <div>Price</div>
            <div>Mileage</div>
            <div>Location</div>
            <div>Transmission</div>
            <div>Condition</div>
            <div>Color</div>
            <div>For Sale</div>
          </>
          :<></>}
          {vehicleFilterRetrieve('vehiclefilter') === 'boat' ?
          <>Boat Selected
            <div>Make</div>
            <div>Model</div>
            <div>Year</div>
            <div>Type</div>
            <div>Price</div>
            <div>Hours</div>
            <div>Location</div>
            <div>Condition</div>
            <div>Type</div>
            <div>Price</div>
            <div>For Sale</div>
          </>
          :<></>}
          {vehicleFilterRetrieve('vehiclefilter') === 'motorcycle' ?
          <>Motorcycle Selected
            <div>Make</div>
            <div>Model</div>
            <div>Year</div>
            <div>Price</div>
            <div>Mileage</div>
            <div>Color</div>
            <div>Location</div>
            <div>Condition</div>
            <div>Type</div>
            <div>For Sale</div>
          </>
          :<></>}
          {vehicleFilterRetrieve('vehiclefilter') === 'rv' ?
          <>RV Selected
            <div>Make</div>
            <div>Model</div>
            <div>Year</div>
            <div>Type</div>
            <div>Price</div>
            <div>Weight</div>
            <div>Mileage</div>
            <div>Sleeps</div>
            <div>Location</div>
            <div>Condition</div>
            <div>For Sale</div>
          </>
          :<></>}
          {vehicleFilterRetrieve('vehiclefilter') === 'trailer' ?
          <>Trailer Selected
            <div>Make</div>
            <div>Model</div>
            <div>Year</div>
            <div>Type</div>
            <div>Price</div>
            <div>Length</div>
            <div>Location</div>
            <div>Condition</div>
            <div>For Sale</div>
          </>
          :<></>}
        </div>
      </div>

      </div>
    </div>
  )
}

export default FrontPage