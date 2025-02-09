import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, IconButton, Typography } from '@material-tailwind/react';
import { useControllerProvider, setOpenSidenav } from '@/context';
import { getRoutesByRole } from '@/routes/routes';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export function Sidenav({ brandName }) {
  const [controller, dispatch] = useControllerProvider();
  const { openSidenav } = controller;
  const [routes, setRoutes] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setRoutes(getRoutesByRole(user.role));
  }, [user]);

  return (
    <aside
      className={`bg-white shadow-sm ${
        openSidenav ? 'translate-x-0' : '-translate-x-80'
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className={`relative`}>
        <div className="py-6 px-8 text-center">
          <Typography variant="h6" color="blue-gray">
            {brandName}
          </Typography>
        </div>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-6 w-6 text-blue-gray-400" />
        </IconButton>
      </div>
      <div className="m-4">
        {routes.map(({ icon, name, path }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            <li key={key}>
              <NavLink to={`/dashboard${path}`}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? 'gradient' : 'text'}
                    color={isActive ? 'blue' : 'blue-gray'}
                    className="flex items-center gap-4 px-4 capitalize"
                    fullWidth
                  >
                    {icon}
                    <Typography
                      color="inherit"
                      className="font-medium capitalize"
                    >
                      {name}
                    </Typography>
                  </Button>
                )}
              </NavLink>
            </li>
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandName: 'Easy Buy',
};

Sidenav.propTypes = {
  brandName: PropTypes.string,
};

Sidenav.displayName = '/src/widgets/layout/sidnave.jsx';

export default Sidenav;
