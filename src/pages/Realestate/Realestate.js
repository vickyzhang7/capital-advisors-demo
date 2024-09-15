import React, { useEffect, useState, useRef } from 'react';
import './Realestate.css';
import { Row, Col , Button } from 'antd';
import Card from '../../components/Card/Card';
import Dataroom from '../../components/Dataroom/Dataroom';
import AWS from 'aws-sdk';

const Realestate = () => {
  const [properties, setProperties] = useState([]);
  const [selectedPropertyIndex, setSelectedPropertyIndex] = useState(null);
  const [financeFiles, setFinanceFiles] = useState([]);
  const [taxFiles, setTaxFiles] = useState([]);
  const [docsFiles, setDocsFiles] = useState([]);
  const [photosFiles, setPhotosFiles] = useState([]);
  const detailSectionRef = useRef(null); 
  
  
  AWS.config.update({
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: 'us-east-2',
  });

  

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await fetch('https://capital-advisors.s3.us-east-2.amazonaws.com/properties.json');
      const data = await response.json();
      setProperties(data);
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    const s3 = new AWS.S3();
    const fetchS3Files = (folder) => {
      const params = {
        Bucket: 'elseware-test',
        Prefix: folder,
      };
  
      return new Promise((resolve, reject) => {
        s3.listObjectsV2(params, (err, data) => {
          if (err) {
            console.log('Error fetching data from S3:', err);
            reject(err);
          } else {
            const files = data.Contents.map((file) => ({
              path: file.Key,
              url: `https://${params.Bucket}.s3.${AWS.config.region}.amazonaws.com/${file.Key}`,
              time: new Date(file.LastModified).toLocaleDateString(),
            }));
            resolve(files);
          }
        });
      });
    };
  
    fetchS3Files('Finance/').then(setFinanceFiles);
    fetchS3Files('AnnualReport/').then(setTaxFiles);
    fetchS3Files('Docs/').then(setDocsFiles);
    fetchS3Files('Photos/').then(setPhotosFiles);
  }, []); 
  
  

  const handleDetailsClick = (index) => {
    if (selectedPropertyIndex === index) {
      setSelectedPropertyIndex(null);
    } else {
      setSelectedPropertyIndex(index);
      setTimeout(() => {
        if (detailSectionRef.current) {
          detailSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  };

  return (
    <div>
      <div className="real-estate-container">
        <h2>Real Estate Investment</h2>
        <p>
          Real estate investment is a popular way to build wealth and diversify your investment portfolio. At WZ Investment, we offer a range of real estate investment opportunities for our clients.
        </p>
        <p>
          Whether you’re looking to invest in residential properties, commercial real estate, or land development, we have the expertise to help you achieve your financial goals.
        </p>
        <p>
          Our team of real estate experts will guide you through the investment process, from property selection to closing the deal. We’ll help you make informed decisions and maximize your returns.
        </p>
      </div>

      <div className="real-estate-grid">
        {properties.map((property, index) => (
          <div key={index}>
            <Card
              key={index}
              title={property.title}
              imgUrl={property.imgUrl}
              propertyType={property.propertyType}
              price={property.price}
              marketCap={property.marketCap}
              capRate={property.capRate}
              priceChange={property.priceChange}
              button={
                <Button onClick={() => handleDetailsClick(index)}>
                  {selectedPropertyIndex === index ? 'Hide Details' : 'Details'}
                </Button>
              }
            />
          </div>
        ))}
      </div>

      {selectedPropertyIndex !== null && (
        <div className="Documents" ref={detailSectionRef}>
          <Row>
            <Col span={24}>
              <Dataroom title="Property Details" folders={['Photos', 'Docs', 'Finance']} files={photosFiles.concat(docsFiles, financeFiles)} />
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Dataroom title="Tax Document" folders={['AnnualReport']} files={taxFiles} />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Realestate;
