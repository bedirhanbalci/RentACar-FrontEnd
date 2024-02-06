import React, { useEffect, useState } from 'react'
import ContactMap from '../../components/layout/ContactMap/ContactMap';
import FormikContact from '../../components/common/FormikContact/FormikContact';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GetByIdBranchResponse } from '../../models/branch/responses/GetByIdBranchResponse';
import branchService from '../../services/branchService';

type Props = {};

const Contact = (props: Props) => {
  const [branch, setBranch] = useState<GetByIdBranchResponse>();

    const fetchBranch = async () => {
      try {
        const response = await branchService.getById(1);
        setBranch(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
    fetchBranch();
  }, []);
  
  const email=' @.com.tr '
  return (
    <>
  <section className='page-header mb-5' style={{ 
  background: `linear-gradient(to top, #c31432, #ff4e50)`, minHeight: '80px' }}>
  <Container style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    height: '80px', 
    textAlign: 'center' }}>
    <h1 className='title' style={{ 
      color: 'white', 
      fontFamily: '"Open Sans", sans-serif', 
      fontSize:'25px', 
      fontWeight: 'bold'
    }}>
      Contact
    </h1>
  </Container>
</section>

<section className="primary-section" >
  <Container>
    <div className ="card-list" >
  <div className="row">
  <div className="col-sm-4 mb-3 mb-sm-0">
    <div className="card" style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#fafaf5' }}>
      <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <h5 className="card-title" style={{ color: '#c31432' }}> For Your Reservations</h5>
        <p className="card-text" style={{ fontFamily: '"Open Sans", sans-serif', overflowY: 'auto', minHeight: '200px' }}>You can reach our Reservation Center from res@avis.com.tr e-mail address or 444 28 47/444 Avis between the hours 09:00-19:00 on weekdays and weekends.
        You can also make your reservations online from our www.avis.com.tr website.
        Our number for international calls is + 90 (216) 444 28 47</p>
      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="card" style={{ display: 'flex', flexDirection: 'column', backgroundColor:'#fafaf5' }}>
      <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <h5 className="card-title" style={{ color: '#c31432' }}>Customer Relations</h5>
        <p className="card-text" style={{ fontFamily: '"Open Sans", sans-serif', overflowY: 'auto', minHeight: '200px' }}>For all your suggestions, requests, criticisms and comments, you can contact us from our Contact Center by pressing 3 on our 444 28 47 / 444 Avis&nbsp;line between 08:00-17:00 on weekdays, our contact form on our website, or our e-mail address <Link to={email}> @.com.tr </Link> </p>
      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="card" style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#fafaf5' }}>
      <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <h5 className="card-title" style={{ color: '#c31432' }}>Avis Full Support Service</h5>
        <p className="card-text" style={{ fontFamily: '"Open Sans", sans-serif', overflowY: 'auto', minHeight: '200px' }}>You can reach us 24 / 7 by dialing 2 on 444 28 47 / 444 Avis line in case of any kind of emergency, such as breakdowns, accidents, or roadside assistance. 
        <br/>
         You can also benefit from Avis Full Support Services when you log in to our website as a member.</p>
      </div>
    </div>
  </div>
</div>
</div>
<div className="row" >
<div className="col-lg-6 col-md-12" style={{ padding: '24px' }}>
  <div className='map-card' style={{ overflow: 'hidden' }}> {/* overflow: 'hidden' eklenerek dışa taşma engellendi */}
    <h4 className='title' style={{ color:'#c31432' }}>Headquarters</h4>
    <p className="desc">Avis Türkiye Aydınevler Mah. Saygı Cad.No: 60 34854 Küçükyalı / İstanbul</p>
    <div className="map-item" style={{ width: '100%', height: '100%', border: '0' }}>
      {branch && <ContactMap branch={branch} />}
    </div>
  </div>
</div>
  <div className="col-lg-6 col-md-12" style={{ padding: '24px' }}>
    <FormikContact/>
  </div>
</div>
  </Container>
</section>
    </> 
  );
}
export default Contact