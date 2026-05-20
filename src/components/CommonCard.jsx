import Card from 'react-bootstrap/Card';

const CommonCard = ({ cardTitles, chart }) => {
  return (
    <Card className='border-0 rounded-2 mt-5 p-2 shadow-sm'>
      <Card.Body>
        <Card.Title as='h2' className='fw-bold'>
          {cardTitles.main}
        </Card.Title>
        <Card.Subtitle as='small'>{cardTitles.secondary}</Card.Subtitle>
        {chart}
      </Card.Body>
    </Card>
  );
};

export default CommonCard;
