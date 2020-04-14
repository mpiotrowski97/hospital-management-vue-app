import React from "react";
import {Link, NavLink} from "react-router-dom";

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUserMenuOpen: false
    }
  }

  render() {
    return (
      <nav id="header" className="bg-white fixed w-full z-10 top-0 shadow">
        <div className="w-full container mx-auto flex flex-wrap items-center mt-0 pt-3 pb-3 md:pb-0">

          <div className="w-1/2 pl-2 md:pl-0">
            <Link to={"/"} className="text-gray-900 text-base xl:text-xl no-underline hover:no-underline font-bold">
              System zarządzania szpitalem
            </Link>
          </div>
          <div className="w-1/2 pr-0">
            <div className="flex relative inline-block float-right">

              <div className="relative text-sm">
                <button id="userButton" className="flex items-center focus:outline-none mr-3" onClick={() => this.setState({isUserMenuOpen: !this.state.isUserMenuOpen})}>
                  <span className="hidden md:inline-block">
                    Witaj użytkowniku
                  </span>
                  <svg className="pl-2 h-2" version="1.1" viewBox="0 0 129 129">
                    <g>
                      <path
                        d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"/>
                    </g>
                  </svg>
                </button>
                <div id="userMenu"
                     className={`bg-white rounded shadow-md mt-2 absolute mt-6 top-0 right-0 min-w-full overflow-auto z-30 ${this.state.isUserMenuOpen || 'invisible'}`}
                      onClick={() => this.setState({isUserMenuOpen: false})}>
                  <ul className="list-reset">
                    <li>
                      <NavLink to={"/my-account"} className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline">
                        My account
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>


              <div className="block lg:hidden pr-4">
                <button id="nav-toggle"
                        className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-teal-500 appearance-none focus:outline-none">
                  <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                  </svg>
                </button>
              </div>
            </div>

          </div>


          <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-white z-20"
               id="nav-content">
            <ul className="list-reset lg:flex flex-1 items-center px-4 md:px-0">
              <li className="mr-6 my-2 md:my-0">
                <NavLink exact={true} activeClassName="text-orange-600 border-orange-600" to={"/"} className="block py-1 md:py-3 pl-1 align-middle no-underline hover:text-gray-900 border-b-2 hover:border-orange-600">
                  <i className="fas fa-home fa-fw mr-3 text-orange-600"/>
                  <span className="pb-1 md:pb-0 text-sm">Operacje</span>
                </NavLink>
              </li>
            </ul>

          </div>

        </div>
      </nav>
    )
  }
}
