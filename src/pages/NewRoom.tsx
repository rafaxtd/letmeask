import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { database } from '../services/firebase';

import { useAuth } from '../hooks/useAuths';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';


import '../styles/auth.scss';
import { Button } from '../components/Button';



export function NewRoom() {

    const { user } = useAuth();
    const history = useHistory();

    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {

        event.preventDefault();

        if(newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,

        })

        history.push(`/admin/rooms/${firebaseRoom.key}`)

    }


    return (
        <div id="page-auth">
            <aside>

                <img src={illustrationImg} alt="Illustration for Question and Answer" />
                <div className="media">
                <strong>Create Q&amp;A rooms in live</strong>
                <p>Your audience questions replied in real-time</p>
                </div>

            </aside>

            <main>
                <div className="main-content">
                    <Link to="/"> <img src={logoImg} alt="Letmeask" /> </Link>
                    <h2>Create a new room</h2>

                <form onSubmit={handleCreateRoom}>
                    <input 
                    type="text" 
                    placeholder="Room's name"
                    onChange={event => setNewRoom(event.target.value)}
                    value={newRoom}
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