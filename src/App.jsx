import Navbar from './components/Navbar'
import { Switch, Route } from 'wouter'
import Planes from './pages/Planes'
import Almacen from './pages/Almacen'
import MapView from './components/MapView'
import classes from './App.module.css'

const App = () => {

  return (
    <>
      <div className={classes.app}>
        <Navbar />
        <main className={classes.content}>
          <Switch>
            <Route path="/" component={Planes} />
            <Route path="/planes" component={Planes} />
            <Route path="/almacen" component={Almacen} />
            <Route path="/plan/:id" component={MapView} />
          </Switch>
        </main>
      </div>
    </>
  )
}

export default App
