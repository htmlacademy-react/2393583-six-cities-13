import Layout from '../../components/layout/layout';
import CitiesList from '../../components/cities-list/cities-list';
import {useAppSelector} from '../../hooks';
import { getSelectedCity } from '../../store/offer-process/selector';

function WelcomeScreenEmpty(): JSX.Element {
  const selectedCity = useAppSelector(getSelectedCity);

  return (
    <div className='page page--gray page--main'>
      <Layout />

      <main className='page__main page__main--index page__main--index-empty'>
        <h1 className='visually-hidden'>Cities</h1>
        <CitiesList />
        <div className='cities'>
          <div className='cities__places-container cities__places-container--empty container'>
            <section className='cities__no-places'>
              <div className='cities__status-wrapper tabs__content'>
                <b className='cities__status'>No places to stay available</b>
                <p className='cities__status-description'>We could not find any property available at the moment in {selectedCity}</p>
              </div>
            </section>
            <div className='cities__right-section'></div>
          </div>
        </div>
      </main>
    </div>
  );

}

export default WelcomeScreenEmpty;
