import { SortingType } from '../../const';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useState } from 'react';
import { getSortingType } from '../../store/offers-process/offers-process.selector';

function SortingOptions(): JSX.Element {
  const activeSortingType = useAppSelector(getSortingType);
  const [isOpened, setIsOpened] = useState(false);
  const dispatch = useAppDispatch();

  const handleSortingClick = (type: SortingType) => {
    dispatch(changeSortingType({type}));
  };

  return (
    <form className="places__sorting" action="#" method="get" >
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setIsOpened((option) => !option)}>
        {activeSortingType}
        <svg className="places__sorting-arrow" width="7" height="4" >
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={classNames('places__options', 'places__options--custom', {'places__options--opened':isOpened})} onClick={() => setIsOpened((option) => !option)}>
        {Object.values(SortingType).map((type) => (
          <li key={type} onClick={() => handleSortingClick(type)} className={classNames('places__option', {'places__option--active': type === activeSortingType})} tabIndex={0}>
            {type}
          </li>))}
      </ul>
    </form>
  );
}

export default SortingOptions;
