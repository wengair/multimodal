import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import Nav from './components/Nav'
import ExploreInstanceList from './views/ExploreInstanceList'
import ExploreScatterPlot from './views/ExploreScatterPlot'
import ComparisonInstanceList from './views/ComparisonInstanceList'
import ComparisonScatterPlot from './views/ComparisonScatterPlot'
import ExploreSingleInstance from './views/ExploreSingleInstance'
import ComparisonSingleInstance from './views/ComparisonSingleInstance'
import DataContext from './components/DataContext'
import './App.css'

function App() {
  return (
    <Router>
      <DataContext>
        <Nav />
        {/* make path '/explore/instances' as our landing page */}
        <Redirect from='/' to='/explore/instances' />
        <Route path='/explore/instances' exact component={ExploreInstanceList} />
        <Route path='/explore/instances/:id' exact component={ExploreSingleInstance} />
        {/* you can access the following page by visiting http://localhost:3000/explore/plot */}
        <Route path='/explore/plot' exact component={ExploreScatterPlot} />
        <Route path='/comparison/instances' exact component={ComparisonInstanceList} />
        <Route path='/comparison/instances/:id' exact component={ComparisonSingleInstance} />
        <Route path='/comparison/plot' exact component={ComparisonScatterPlot} />
      </DataContext>
    </Router>
  )
}

export default App
