import Card from 'react-bootstrap/Card';

type CommonCardProps = {
  cardTitles: {
    main: string;
    secondary: string;
  };
};

const CommonCard = ({ cardTitles }: CommonCardProps) => {
  return (
    <Card className='border-0 rounded-2 mt-5 p-2 shadow-sm'>
      <Card.Body>
        <Card.Title as='h2' className='fw-bold'>
          {cardTitles.main}
        </Card.Title>
        <Card.Subtitle as='small'>{cardTitles.secondary}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default CommonCard;
