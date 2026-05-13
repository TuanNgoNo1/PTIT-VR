import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import contact from '../../data/contact';
import { validateContactForm } from './contactValidation';
import './ContactPage.css';

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', content: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = validateContactForm(form);
    if (result.valid) {
      setSuccess(true);
      setForm({ name: '', email: '', subject: '', content: '' });
      setErrors({});
    } else {
      setErrors(result.errors);
    }
  };

  const breadcrumbItems = [
    { label: 'Trang chủ', to: '/' },
    { label: 'Liên hệ', to: '/lien-he' },
  ];

  return (
    <div className="contact-page">
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />

        <section className="contact-page__section">
          <h2>Các cơ sở</h2>
          <div className="contact-page__campuses">
            {contact.campuses.map((campus, i) => (
              <div key={i} className="contact-page__campus">
                <h3>{campus.name}</h3>
                <p>Địa chỉ: {campus.address}</p>
                <p>Điện thoại: {campus.phone}</p>
                <p>Email: {campus.email}</p>
                {campus.mapEmbedUrl && (
                  <iframe src={campus.mapEmbedUrl} title={campus.name} loading="lazy" />
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="contact-page__section">
          <h2>Gửi liên hệ</h2>
          <form className="contact-page__form" onSubmit={handleSubmit}>
            <div className="contact-page__field">
              <label>Họ và tên</label>
              <input name="name" value={form.name} onChange={handleChange} />
              {errors.name && <div className="contact-page__field-error">{errors.name}</div>}
            </div>
            <div className="contact-page__field">
              <label>Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} />
              {errors.email && <div className="contact-page__field-error">{errors.email}</div>}
            </div>
            <div className="contact-page__field">
              <label>Tiêu đề</label>
              <input name="subject" value={form.subject} onChange={handleChange} />
              {errors.subject && <div className="contact-page__field-error">{errors.subject}</div>}
            </div>
            <div className="contact-page__field">
              <label>Nội dung</label>
              <textarea name="content" value={form.content} onChange={handleChange} />
              {errors.content && <div className="contact-page__field-error">{errors.content}</div>}
            </div>
            <button type="submit" className="contact-page__submit">Gửi liên hệ</button>
            {success && <div className="contact-page__success">Đã gửi liên hệ. Học viện sẽ phản hồi qua email.</div>}
          </form>
        </section>
      </div>
    </div>
  );
}

export default ContactPage;
