import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import logo from './../assets/images/logo-horizontal-purple-en.svg';

const TopNav = () => {
  return (
    <Navbar expand='lg' className='mt-5'>
      <Container className='p-0'>
        <Navbar.Brand href='/'>
          <img src={logo} className='max-h-50px' alt='logo' />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default TopNav;
