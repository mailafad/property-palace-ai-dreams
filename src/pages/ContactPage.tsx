
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { Card } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-1 container px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our team of expert realtors is here to help you find your dream property in India. Reach out to us with any questions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            
            <Card className="p-6 mb-6">
              <ContactForm />
            </Card>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Our Office Hours</h3>
              <div className="flex items-start space-x-3 mb-4">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Monday - Saturday</p>
                  <p className="text-muted-foreground">10:00 AM - 7:00 PM IST</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Sunday</p>
                  <p className="text-muted-foreground">Closed</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Phone</h3>
                  <p className="text-muted-foreground mb-1">Our agents are available during business hours</p>
                  <p className="font-medium">+91 9003111000</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Email</h3>
                  <p className="text-muted-foreground mb-1">We'll respond as quickly as possible</p>
                  <p className="font-medium">info@afglobalenterprises.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Office Location</h3>
                  <p className="text-muted-foreground mb-1">Come visit our main office</p>
                  <p className="font-medium">No.1, Kalaignar Road</p>
                  <p className="text-muted-foreground">Anna Nagar, Pammal</p>
                  <p className="text-muted-foreground">Chennai-75</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="mt-0 bg-gray-100 rounded-lg overflow-hidden w-full h-[350px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8874.861323607745!2d80.144663729492!3d12.977492157551284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525e2d7354b699%3A0x5e69889436be4ebf!2s1%2C%20Kalaignar%20Rd%2C%20Anna%20Nagar%2C%20Mallika%20Nagar%2C%20Meenambakkam%2C%20Chennai%2C%20Tamil%20Nadu%20600016!5e0!3m2!1sen!2sin!4v1754545216452!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Company Location"/>
                </div>

            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
