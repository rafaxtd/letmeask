import { Link } from 'react-router-dom'


import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button';





export function NewRoom() {


    return (
        <div id="page-auth">
            <aside>

                <img src={illustrationImg} alt="Illustration for Question and Answer" />
                <strong>Create Q&amp;A rooms in live</strong>
                <p>Your audience questions replied in real-time</p>

            </aside>

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Let me ask Logo" />
                    <h2>Create a new room</h2>

                <form action="">
                    <input 
                    type="text" 
                    placeholder="Room's name"
                    />

                    <Button type="submit">
                        Create room
                    </Button>
                  
                </form>

                <p>Do you want to join an existing room? <Link to="/">Click here</Link></p>

                

                </div>
            </main>
        </div>
    )
}