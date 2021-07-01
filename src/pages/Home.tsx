import { useHistory } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../App';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';


import '../styles/auth.scss';


export function Home() {

    const history = useHistory();
    const { user, signInWithGoogle  } = useContext(AuthContext)

    
   async function handleCreateRoom() {

        if(!user) {
           await signInWithGoogle();
        }

        history.push('/rooms/new');


    }

    

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
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Google logo" />
                        Create your room with Google
                    </button>
                

                <div className="separator">or join an existing room</div>

                <form action="">
                    <input 
                    type="text" 
                    placeholder="Type room's code here"
                    />

                    <Button type="submit">
                        Join room
                    </Button>
                  
                </form>

                

                </div>
            </main>
        </div>
    )
}