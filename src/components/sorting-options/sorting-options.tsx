import { SortingType } from '../../const';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeSortingType } from '../../store/action';
import { useRef } from 'react';

function SortingOption(): JSX.Element {
  const sortingListRef = useRef<HTMLUListElement | null>(null);
  const activeSortingType = useAppSelector((state) => state.sortingType);
  const dispatch = useAppDispatch();

  const handleSortingClick = (type: SortingType) => {
    dispatch(changeSortingType({type}));
  };

  return (
    <form className="places__sorting" action="#" method="get" onClick={() => sortingListRef.current?.classList.toggle('places__options--opened')}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {activeSortingType}
        <svg className="places__sorting-arrow" width="7" height="4" >
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom" ref={sortingListRef}>
        {Object.values(SortingType).map((type) => (
          <li key={type} onClick={() => handleSortingClick(type)} className={classNames('places__option', {'places__option--active': type === activeSortingType})} tabIndex={0}>
            {type}
          </li>))}
      </ul>
    </form>
  );
}

export default SortingOption;
