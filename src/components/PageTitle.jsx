import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';

const PageTitle = () => {
  return (
    <>
      <h1 className='h1 mt-5'>Dashboard Charts Demo</h1>
      <Stack direction='horizontal' gap={2}>
        <Badge pill className='bg-bootstrap-purple'>
          Bootstrap
        </Badge>
        <Badge pill bg='info'>
          React
        </Badge>
        <Badge pill bg='warning' text='dark'>
          Chart.js
        </Badge>
        <Badge pill bg='danger'>
          Day.js
        </Badge>
      </Stack>
    </>
  );
};

export default PageTitle;
