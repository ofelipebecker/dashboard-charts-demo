import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import logo from './../assets/images/logo-vertical-purple-en.svg';

const TopNav = () => {
  return (
    <Navbar expand='lg' className='mt-4 flex-column'>
      <Container className='justify-content-center'>
        <img src={logo} className='max-h-100px' alt='logo' />
      </Container>
      <Container className='justify-content-center mt-3'>
        <Button
          href='https://felipebecker.com/'
          variant='link'
          size='lg'
          target='_blank'
          title='Open in new tab'
        >
          Portfolio
        </Button>
        <Button
          href='https://github.com/ofelipebecker'
          variant='link'
          size='lg'
          target='_blank'
          title='Open in new tab'
        >
          Github
        </Button>
      </Container>
    </Navbar>
  );
};

export default TopNav;
