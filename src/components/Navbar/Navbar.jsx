import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import {
  IconRoute,
  IconTruck,
  IconBuildingStore,
  IconUser,
  IconLogout,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useLocation } from "wouter";
import classes from './Navbar.module.css';

const NavbarLink = ({ icon: Icon, label, active, onClick }) => {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const pages = [
  { 
    icon: IconRoute,
    location: '/planes',
    label: 'Planes recientes'
  },
  { 
    icon: IconBuildingStore,
    location: '/almacen',
    label: 'Mi almacén' 
  },
  { 
    icon: IconTruck,
    location: '/vehiculos',
    label: 'Mis vehículos' 
  }
];

const Navbar = () => {
  const [location, setLocation] = useLocation();

  const links = pages.map((link) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={link.location === location}
      onClick={() => {
        setLocation(link.location)
      }}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>
        <MantineLogo type="mark" size={30} />
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconUser} label="Mi cuenta" />
        <NavbarLink icon={IconLogout} label="Cerrar sesión" />
      </Stack>
    </nav>
  );
}

export default Navbar;