import { FC } from 'react'
import { FaHome, FaFilm, FaTv, FaPlay, FaStar, FaVideo } from 'react-icons/fa'
import Home from '../pages/Home'
import Movie from '../pages/Movie'
import TV from '../pages/TV'
import Anime from '../pages/Anime'
import Variety from '../pages/Variety'
import Short from '../pages/Short'

export interface MenuItem {
  path: string
  name: string
  component: FC
  icon: FC
}

export const menuConfig: MenuItem[] = [
  {
    path: '/',
    name: '首页',
    component: Home,
    icon: FaHome
  },
  {
    path: '/movie',
    name: '电影',
    component: Movie,
    icon: FaFilm
  },
  {
    path: '/tv',
    name: '电视剧',
    component: TV,
    icon: FaTv
  },
  {
    path: '/anime',
    name: '动漫',
    component: Anime,
    icon: FaPlay
  },
  {
    path: '/variety',
    name: '综艺',
    component: Variety,
    icon: FaStar
  },
  {
    path: '/short',
    name: '短剧',
    component: Short,
    icon: FaVideo
  }
] 