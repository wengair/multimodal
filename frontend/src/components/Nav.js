import React, {useState, useEffect} from 'react'
import DropdownMenu from './DropdownMenu'
import {useHistory, useLocation, Link} from 'react-router-dom'

function Nav() {
  const history = useHistory()
  const location = useLocation()
  const [showNav, setShowNav] = useState(true)
  const tagIds = ['nav-tag-exploration', 'nav-tag-eimparison']

  useEffect(() => {
    if(/^\S*\/instances\//.test(location.pathname)) setShowNav(false)
    else setShowNav(true)
    
    if(showNav) {
      for(const tagId of tagIds) document.getElementById(tagId).classList.remove('choosen')
      const path = location.pathname.split('/')
      if (path.includes('explore')) document.getElementById('nav-tag-exploration').classList.add('choosen')
      else if(path.includes('comparison')) document.getElementById('nav-tag-eimparison').classList.add('choosen')
    }
  }, [location, showNav])


  return (showNav &&
    <div className='nav-container'>
      <p>Mode: </p>
      <div id='nav-tag-exploration'><Link to={'/explore/instances'}>Exploration</Link></div>
      <div id='nav-tag-eimparison'><Link to={'/comparison/instances'}>Comparison</Link></div>
      <style jsx='true'>
        {`
        .nav-container {
          height: 70px;
          padding: 0px 50px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        #nav-tag-exploration {
          padding: 2px;
          margin: 0px 5px;
        }
        
        #nav-tag-eimparison {
          padding: 2px;
          margin: 0px 5px;
        }

        .choosen {
          padding-bottom: 0px !important;
          border-bottom: 3px solid var(--c-strong-blue);
        }
        `}
      </style>
    </div>
  )
}

export default Nav
