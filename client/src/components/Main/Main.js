import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout/MainLayout';
import ChangeViewDropDown from './ChangeViewDropDown';
import TitleView from './TitleView';
import MagazineView from './MagazineView';
import CardView from './CardView';
import { getNewsletter } from '../../actions/newsletterActions';
import { hideNews } from '../../services/userService';
import transformNewsletterNews from '../../helpers/transformNewsletterNews';

import './Main.scss';

const Main = ({ match, user, newsletter, getNewsletter, newsIdArrayToHide }) => {
    const { newsletterId } = match.params;
    const [news, setNews] = useState(null);

    const [view, setView] = useState('magazineView');


    let history = useHistory();

    if (!user) {
        history.push('/');
    }

    useEffect(() => {
        if (user) {
            user.getIdToken()
                .then(idToken => getNewsletter(newsletterId, idToken))
                .catch(console.log);
        }
    }, [newsletterId, user, getNewsletter]);

    useEffect(() => {
        const data = transformNewsletterNews(newsletter.news);
        setNews(data);
    }, [newsletter]);

    useEffect(() => {
        if (user) {
            user.getIdToken()
                .then(async idToken => {
                    if (newsIdArrayToHide) {
                        await hideNews(newsIdArrayToHide, idToken);
                        await getNewsletter(newsletterId, idToken);
                    }
                })
                .catch(err => console.log(err));
        }
    }, [newsIdArrayToHide, user, getNewsletter, newsletterId]);

    const viewStyle = {
        magazineView: MagazineView,
        cardView: CardView,
        titleOnlyView: TitleView,
    }

    const PageView = viewStyle[view]

    return (
        <MainLayout>
            <main className="main-wrapper">
                <section className='main-title'>
                    <h1>Main Page</h1>
                    <div className="change-view-dropdown-container">
                        <ChangeViewDropDown view={view} setView={setView} className="change-view-dropdown" />
                    </div>
                </section>

                <h2>{newsletter && newsletter.name}</h2>

                <section className="view-wrapper">
                    <PageView news={news} />
                </section>
            </main>
        </MainLayout>
    );
}

const mapStateToProps = state => ({
    user: state.user.user,
    newsletter: state.newsletter.newsletter,
    newsIdArrayToHide: state.newsletter.newsIdArrayToHide,
})

const mapDispatchToProps = {
    getNewsletter
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);