import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSpinner, faCircleXmark, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import Button from '~/components/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import images from '~/assets/images';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import {
  BoxMessageIcon,
  FavoriteIcon,
  HelpIcon,
  KeyboardIcon,
  LanguageIcon,
  MessageIcon,
  SearchIcon,
  SettingIcon,
  SignOutIcon,
  UserIcon,
} from '~/components/Icons';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
  {
    icon: <LanguageIcon />,
    title: 'Tiếng Việt',
    children: {
      title: 'Ngôn ngữ',
      data: [
        {
          type: 'language',
          code: 'vi',
          title: 'Tiếng Việt',
        },
        {
          type: 'language',
          code: 'en',
          title: 'English',
        },
      ],
    },
  },
  {
    icon: <HelpIcon />,
    title: 'Phản hồi và trợ giúp',
    to: '/feedback',
  },
  {
    icon: <KeyboardIcon />,
    title: 'Phím tắt trên bàn phím',
  },
];

function Header() {
  const [searchResults, setSearchResults] = useState([]);
  const currentUser = true;

  useEffect(() => {
    setSearchResults([]);
  }, []);

  const handleMenuChange = (menuItem) => {
    console.log(menuItem);
  };

  const userMenu = [
    {
      icon: <UserIcon />,
      title: 'Xem hồ sơ',
      to: '/@hoaa',
    },
    {
      icon: <FavoriteIcon />,
      title: 'Yêu thích',
      to: '/favorite',
    },
    {
      icon: <SettingIcon />,
      title: 'Cài đặt',
      to: '/setting',
    },
    ...MENU_ITEMS,
    {
      icon: <SignOutIcon />,
      title: 'Đăng xuất',
      to: '/logout',
      separate: true,
    },
  ];

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('logo')}>
          <img src={images.logo} alt="Tiktok logo" />
        </div>
        <HeadlessTippy
          visible={searchResults.length > 0}
          interactive
          render={(attrs) => (
            <div className={cx('search-results')} tabIndex="-1" {...attrs}>
              <PopperWrapper>
                <h4 className={cx('search-title')}>Tài khoản</h4>
                <AccountItem />
                <AccountItem />
                <AccountItem />
                <AccountItem />
              </PopperWrapper>
            </div>
          )}
        >
          <div className={cx('search')}>
            <input placeholder="Tìm kiếm" spellCheck={false} />
            <button className={cx('clear')}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
            <button className={cx('search-btn')}>
              <SearchIcon />
            </button>
          </div>
        </HeadlessTippy>
        <div className={cx('actions')}>
          <Button text leftIcon={<FontAwesomeIcon icon={faPlus} />}>
            Tải lên
          </Button>
          {currentUser ? (
            <>
              <Tippy content="Tin nhắn" placement="bottom">
                <button className={cx('action-btn')}>
                  <MessageIcon />
                </button>
              </Tippy>
              <Tippy content="Hộp thư" placement="bottom">
                <button className={cx('action-btn')}>
                  <BoxMessageIcon />
                </button>
              </Tippy>
            </>
          ) : (
            <Button primary>Đăng nhập</Button>
          )}
          <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
            {currentUser ? (
              <Image className={cx('user-avatar')} src="https://i.imgur.com/1rQdo36.png" alt="avatar" />
            ) : (
              <button className={cx('more-btn')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
