import React from 'react';
import {Link} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LockIcon from '@material-ui/icons/Lock';
import BookIcon from '@material-ui/icons/Book';

export const mailFolderListItems = (
  <div>
    
      <ListItem button>
        <Link to='/home'>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
        </Link>
        <ListItemText primary="Home" />
      </ListItem>
    
    
      <ListItem button>
        <Link to = '/about'>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
        </Link>
        <ListItemText primary="About" />
      </ListItem>

      <ListItem button>
        <Link to = '/login'>
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
        </Link>
        <ListItemText primary="Login" />
      </ListItem>

      <ListItem button>
        <Link to = '/blogs'>
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
        </Link>
        <ListItemText primary="Blogs" />
      </ListItem>
    
    <ListItem button>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Inbox" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary="Starred" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText primary="Send mail" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
      <ListItemText primary="Drafts" />
    </ListItem>
  </div>
);

export const otherMailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <MailIcon />
      </ListItemIcon>
      <ListItemText primary="All mail" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="Trash" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      <ListItemText primary="Spam" />
    </ListItem>
  </div>
);