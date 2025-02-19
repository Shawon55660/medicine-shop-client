import React from 'react';

const Faq = () => {
    return (
        <div>
            <h2 className='pb-4 pt-8 text-xl uppercase font-bold'>FAQ about medistore:</h2>
            <div className="join join-vertical w-full">
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" defaultChecked />
    <div className="collapse-title text-xl font-medium">What is Medistore?</div>
    <div className="collapse-content">
      <p>Medistore is an online pharmacy where you can purchase medicines and healthcare products.</p>
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title text-xl font-medium">How can I order medicines from Medistore?</div>
    <div className="collapse-content">
      <p>You can visit our website, add the required medicines to your cart, and place an order online.</p>
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title text-xl font-medium">Does Medistore sell medicines without a prescription?</div>
    <div className="collapse-content">
      <p>No, certain medicines require a valid prescription before purchase.</p>
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title text-xl font-medium">Are all medicines available on Medistore authentic?</div>
    <div className="collapse-content">
      <p>Yes, we only sell 100% genuine and verified medicines from licensed suppliers.</p>
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title text-xl font-medium">How long does Medistore take to deliver an order?</div>
    <div className="collapse-content">
      <p>Delivery time depends on your location, but we strive to deliver within 24-48 hours.</p>
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title text-xl font-medium">What payment options are available on Medistore?</div>
    <div className="collapse-content">
      <p>We accept online payments, credit/debit cards, mobile banking, and cash on delivery (COD).</p>
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title text-xl font-medium">Does Medistore offer home delivery?</div>
    <div className="collapse-content">
      <p>Yes, we provide fast home delivery services in selected areas.</p>
    </div>
  </div>
</div>
            
        </div>
    );
};

export default Faq;