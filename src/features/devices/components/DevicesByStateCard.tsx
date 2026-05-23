import CommonCard from '../../../components/CommonCard.tsx';

const DevicesByStateCard = () => {
  const cardTitles = {
    main: 'Devices by State | Brazil',
    secondary:
      'Demo: Device distribution of a hypothetical company across Brazilian states and regions.',
  };

  return <CommonCard cardTitles={cardTitles} />;
};

export default DevicesByStateCard;
