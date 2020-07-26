import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Location } from 'history';

import BreadCrumb from '@/components/Breadcrumb';
import Fetch from '@/components/Fetch';
import { raagIndices, IRaagIndex } from '../constants/raag-indices';
import { toAngURL } from '../../../util';
import { pageView } from '../../../util/analytics';
import { AmritKeertanIndex } from './AmritKeertanIndex';
import { sanitizeHash, scrollToHash, desanitzeHash } from '../util';
import { TEXTS } from '../../../constants';

interface IGranthIndexProps {
  location: Location;
}

const GRANTH_NAMES = raagIndices.map(({ name }) => name);

export const GranthIndex: React.FC<IGranthIndexProps> = ({ location }) => {
  const { hash } = location;

  const [selection, setSelection] = useState<string[]>(() =>
    hash ? desanitzeHash(hash) : [GRANTH_NAMES[0]]
  );

  // Helps check if a list item is selected to show subSets and description
  const isSelected = useCallback((name: string) => selection.includes(name), [
    selection,
  ]);

  // Called onClick to show description and subSets
  const changeSelection = useCallback(
    (path: string[]) => {
      if (path.join() == selection.join()) {
        path.pop();
      }
      setSelection(path);
    },
    [selection]
  );

  useEffect(() => {
    pageView('/index');
    // making sure the element is rendered on DOM before we get to that
    setTimeout(() => scrollToHash(hash), 800);
  }, []);

  // Recursive function that keeps churning lists until no subSets are left
  // path is a list that helps keep the parents open when a child is clicked upon
  const renderList = useCallback(
    (
      subSets: IRaagIndex[],
      source: IRaagIndex['source'] = 'G',
      path: string[] = []
    ) => {
      return subSets.map(
        (
          {
            name,
            ang: [from, to],
            source: localSource,
            description,
            subSets,
            // Give a default value if highlight is undefined
            highlight = 0,
          },
          i
        ) => {
          if (localSource == null) {
            localSource = source;
          }

          return (
            <div
              key={name}
              style={{ marginLeft: '40px' }}
              id={sanitizeHash(...path, name)}
            >
              <li
                className="list--item"
                style={{
                  animationDelay: i < 15 ? `${20 * i}ms` : '0',
                }}
                onClick={() => {
                  changeSelection(path.concat([name]));
                }}
              >
                <div className="index-list">
                  <div className="index-list--header">
                    <p>{name}</p>
                    <p>
                      <Link
                        className="index-list--url"
                        to={toAngURL({
                          ang: from,
                          source: localSource,
                          highlight,
                        })}
                      >
                        {from}
                      </Link>{' '}
                      to{' '}
                      <Link
                        className="index-list--url"
                        to={toAngURL({
                          ang: to,
                          source: localSource,
                          highlight,
                        })}
                      >
                        {to}
                      </Link>
                    </p>
                  </div>
                  {isSelected(name) && (
                    <div className="index-list--description">{description}</div>
                  )}
                </div>
              </li>
              {isSelected(name) && subSets && subSets.length > 0
                ? renderList(subSets, localSource, path.concat([name]))
                : null}
            </div>
          );
        }
      );
    },
    [isSelected, changeSelection]
  );

  return (
    <Fetch url={AMRIT_KEERTAN_API_URL}>
      {({ data, error, loading }) => {
        if (error) {
          return <div>ERROR WHILE LOADING AMRIT KEERTAN INDEX.</div>;
        }

        if (loading) {
          return <div className="spinner" />;
        }

        return (
          <div className="row" id="content-root">
            <BreadCrumb links={[{ title: TEXTS.URIS.INDEX }]} />
            <div id="help">
              <div id="sidebar">
                <ul>
                  {Object.entries(raagIndices).map(([key, { name }]) => (
                    <li key={key}>
                      <a href={`#${sanitizeHash(name)}`}>{name}</a>
                    </li>
                  ))}
                  {/* Amrit keertan Index */}
                  <li>
                    <a href="#amritKeertan">Amrit Keertan</a>
                  </li>
                </ul>
              </div>

              <main>
                {renderList(raagIndices)}
                <AmritKeertanIndex data={data.headers} />
              </main>
            </div>
          </div>
        );
      }}
    </Fetch>
  );
};

export default GranthIndex;
