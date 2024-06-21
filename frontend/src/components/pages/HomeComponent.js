import { useNavigate } from 'react-router-dom';
import StudentPicture600x300 from '../pictures/students600x300.jpg'
import StudentPicture500x250 from '../pictures/students500x250.jpg'


export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="container mt-5">
            <section className="text-center bg-light p-5 rounded">
                <h1>Welcome to Student Store!</h1>
                <p>Discover the best tools and resources tailored for your academic journey.</p>
                <img src={StudentPicture600x300} alt="Students studying" className="img-fluid my-3 rounded" />
                <button className="btn btn-primary mt-3 mx-2" onClick={() => navigate('/products')}>Shop Now</button>
            </section>

            <section className="my-5">
                <h2>About Our Store</h2>
                <p>
                    At the Student Store, we understand the needs and challenges of today's students.
                    We offer a curated selection of products that help you succeed in your academic pursuits.
                    On our platform students can also offer and acquire tutorials for free.
                </p>
                <img src={StudentPicture500x250} alt="Store interior" className="img-fluid mt-3 rounded" />
            </section>

            <section className="bg-light p-5 rounded mt-5">
                <h2>What Students Say About Us</h2>
                <blockquote className="blockquote mt-3">
                    <p>"The Student Store has everything I need. Their products are top-notch and helped me aquire tutorials"</p>
                    <footer className="blockquote-footer">Jamie L., Computer Science Major</footer>
                </blockquote>
                <blockquote className="blockquote mt-3">
                    <p>"Quick delivery and excellent customer service. I'm a fan!"</p>
                    <footer className="blockquote-footer">Alex M., Literature Major</footer>
                </blockquote>
            </section>
        </div>
    );
}
