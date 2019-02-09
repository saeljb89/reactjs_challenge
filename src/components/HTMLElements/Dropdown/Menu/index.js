import React from 'react';
import _ from 'lodash';

export default ( { menus } ) => {

  menus = _.map(menus, (item, index) => {
    return (
      <li className="dropdown" key={index}>
        <a className="nav-link dropdown-toggle" dangerouslySetInnerHTML={{__html: item.title}} />
        {_.map(item.subMenus, (subMenu, index) => {
          return (
            <div className="dropdown-menu" key={index}>
              <a className="dropdown-item"
                 onClick={subMenu.onClick}
                 dangerouslySetInnerHTML={{__html: subMenu.title}}>
              </a>
            </div>
          )
        })}
      </li>
    )
  });

  return (
    <ul className="list-unstyled">
      {menus}
    </ul>
  );
}
