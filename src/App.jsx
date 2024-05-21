import Navbar from './components/Navbar'
import { Switch, Route } from 'wouter'
import Planes from './pages/Planes'
import Almacen from './pages/Almacen'
import Vehiculos from './pages/Vehiculos' 
import MapView from './components/MapView'
import './App.css'

const App = () => {

  return (
    <>
      <div className="app-container">
        <Navbar />
          <div className="content">
            <Switch>
              <Route path="/" component={Planes} />
              <Route path="/planes" component={Planes} />
              <Route path="/almacen" component={Almacen} />
              <Route path="/vehiculos" component={Vehiculos} />
              <Route path="/plan/:id" component={MapView} />
            </Switch>
          </div>
      </div>
    </>
  )
}

export default App
