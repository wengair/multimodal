import React from 'react'
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
} from '@reach/menu-button'

function DropdownMenu({button, content}) {
  const generateMenuItems = (content) => {
    if (Array.isArray(content)) {
      return content.map((child, idx) => child ? <MenuItem key={idx} onSelect={child[1]}>{child[0]}</MenuItem> : null)
    }
  }

  // the css of this component is in frontend/src/styles/menu-button.css becasue I use the library
  return (
    <div>
      <Menu>
        <MenuButton>{button}</MenuButton>
        <MenuList>
          {generateMenuItems(content)}
        </MenuList>
      </Menu>
    </div>
  )
}

export default DropdownMenu
