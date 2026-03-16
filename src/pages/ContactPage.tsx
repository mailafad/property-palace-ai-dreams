
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
                  <p className="font-medium">+91 9790842020</p>
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
              <div className="text-center p-4">
                <MapPin className="h-8 w-8 mb-2 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">Map would be displayed here</p>
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
