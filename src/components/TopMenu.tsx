import TopMenuItem from './TopMenuItem';
import styles from './topmenu.module.css'
import Image from 'next/image'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Link } from '@mui/material';

export default async function TopMenu() {

    const session = await getServerSession(authOptions)

    return(
        <div className={styles.menucontainer}>
            <Link href='/'>
                <Image src={'/img/medical.png'}
                className={styles.logoimg}
                alt='logo'
                width={0}
                height={0}
                sizes='100vh'/>
            </Link>
            <TopMenuItem title='Select Car' pageRef='/car'/>
            <TopMenuItem title='Reservations' pageRef='/reservations'/>
            <TopMenuItem title='About' pageRef='/about'/>
            <TopMenuItem title='Dentists' pageRef='/dentist'/>
            <TopMenuItem title='Dashboard' pageRef='/dashboard'/>
            <TopMenuItem title='Cart' pageRef='/cart'/>
            <TopMenuItem title='Register' pageRef='/register'/>
            {/* <div className='absolute right-0 h-full flex flex-row'> */}
            {
                session ? <Link href="/api/auth/signout">
                    <div className='flex items-center h-full px-2 text-cyan-600 text-sm right-0'>
                    Sign-Out of {session.user?.name}</div></Link> :
                <Link href="api/auth/signin"><div className='flex items-center h-full px-2 text-cyan-600 text-sm right-0'>
                    Sign-In</div></Link>
            }
            {/* </div> */}
        </div>
    );
}