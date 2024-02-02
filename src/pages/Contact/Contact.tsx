import React from 'react'
import { GoogleMap } from '../../components/layout/GoogleMap/GoogleMap';
import FormikContact from '../../components/common/FormikContact/FormikContact';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Contact() {
  const email=' @.com.tr '
  return (
    <>
  <section className='page-header' style={{ 
  background: `linear-gradient(to top, #c31432, #ff4e50)` 
}}>
  <Container style={{ textAlign: 'center'}}>
    <h1 className='title' style={{ color: 'white', fontFamily: '"Open Sans", sans-serif', fontSize:'25px', fontWeight: 'bold'}}  >Contact</h1>
  </Container>
</section>
<section>
  <Container>
    <div className ="card-list" >
  <div className="row">
  <div className="col-sm-4 mb-3 mb-sm-0">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">For Your Reservations</h5>
        <p className="card-text" style= {{fontFamily: '"Open Sans", sans-serif', height:'200px' }}>You can reach our Reservation Center from res@avis.com.tr e-mail address or 444 28 47/444 Avis between the hours 09:00-19:00 on weekdays and weekends.
        You can also make your reservations online from our www.avis.com.tr website.
        Our number for international calls is + 90 (216) 444 28 47</p>
      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Customer Relations</h5>
        <p className="card-text" style= {{fontFamily: '"Open Sans", sans-serif', height:'200px'}}>For all your suggestions, requests, criticisms and comments, you can contact us from our Contact Center by pressing 3 on our 444 28 47 / 444 Avis&nbsp;line between 08:00-17:00 on weekdays, our contact form on our website, or our e-mail address <Link to={email}> @.com.tr  </Link> </p>
      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Avis Full Support Service</h5>
        <p className="card-text" style= {{fontFamily: '"Open Sans", sans-serif', height:'200px'}}>You can reach us 24 / 7 by dialing 2 on 444 28 47 / 444 Avis line in case of any kind of emergency, such as breakdowns, accidents, or roadside assistance. You can also benefit from Avis Full Support Services when you log in to our website as a member.</p>
      </div>
    </div>
  </div>
</div>
</div>
      <div className="row">
        <div className="col-xl-13 col-lg-11 col-lg-24">
          <div className='card'>
            <h4 className='title' style={{color:'#c31432'}}>Branches</h4>
          <GoogleMap />
        </div>
        </div>
        <div className="offset-xl-1 col-xl-10 col-lg-13 col-24">
          <FormikContact/>
        </div>
      </div>
  </Container>
</section>
    </>
  );
}
