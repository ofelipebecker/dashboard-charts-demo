import Card from 'react-bootstrap/Card';

const CommonCard = ({ title, chart }) => {
  return (
    <Card className='border-0 rounded-2 mt-5 p-2 shadow-sm'>
      <Card.Body>
        <Card.Title as='h2' className='fw-bold'>
          {title}
        </Card.Title>
        {chart}
      </Card.Body>
    </Card>
  );
};

export default CommonCard;
