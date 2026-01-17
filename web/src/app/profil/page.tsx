'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; 
import styles from './profilemodul.css';

const Profil = () => {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <h1>Profil Pengguna</h1>
            <div className="profil-container">
            <img src="path/to/your-avatar.jpg" alt="User avatar for John Doe profile" className="profil-image" />
            </div>
            <div className={styles.details}>
                <h2>Nama: John Doe</h2>
                <p>Email: johndoe@example.com</p>
                <p>Nomor Telepon: +62 812 3456 7890</p>
                <button onClick={() => router.push('/edit-profil')} className={styles.button}>
                    Edit Profil
                </button>
            </div>
        </div>
    );
};

export default Profil;