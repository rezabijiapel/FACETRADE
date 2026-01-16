import React from 'react';
import { useRouter } from 'next/router';
import styles from './profil.module.css'; // File CSS untuk styling jika diperlukan

const Profil = () => {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <h1>Profil Pengguna</h1>
            <div className={styles.avatar}>
                <img src="/path/to/avatar.jpg" alt="Avatar" className={styles.image} />
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