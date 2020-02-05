import React from 'react';
import Logo from '../../assets/img/logo.png';
import { Container, Image } from './styled';
import backbubbles from '../../assets/img/bubbles-main.jpg';
import { FaMusic } from 'react-icons/fa';
import Footer from '../../components/footer';

function Main() {
    return (
        <Container>
            <header>
                <img src={Logo} alt="logo-icon" />
                <h1>
                    Musicfy, <br />
                    Listen all your musics here!
                </h1>
            </header>
            <main>
                <button>LogIn to Listen</button>
                <a href="/">create account for free </a>
            </main>
            <Image img={backbubbles}>
                <h1>Dive in the world of musics with Musicfy</h1>
                <br />
                <h2>For Free</h2>

                <section className="for-artists">
                    <p>
                        <FaMusic /> If you want post your music here,
                        <br /> its only to create a account
                        <br /> how to artists and post in same time <FaMusic />
                        <br />
                    </p>

                    <br />
                    <button type="button">LogIn here</button>
                    <br />
                    <a href="/">Create account</a>
                </section>

                <br />
                <section className="for-mobile">
                    <p>
                        And, if you want to listen your music in anywhere,{' '}
                        <br />
                        please, install we app. it's developed think about you
                    </p>
                </section>
                <br />
            </Image>

            <Footer />
        </Container>
    );
}

export default Main;
