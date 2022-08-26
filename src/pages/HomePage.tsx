import React, {useEffect} from 'react';
import {useLazyGetUserReposQuery, useSearchUsersQuery} from "../store/github/github.api";
import {useDebounce} from "../hooks/debounce";
import RepoCard from "../components/RepoCard";

const HomePage = () => {
    const [search, setSearch] = React.useState('');
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const debouncedSearch = useDebounce(search, 500);
    const {isLoading, isError, data} = useSearchUsersQuery(debouncedSearch, {
        skip: debouncedSearch.length < 3,
        refetchOnFocus: true,
    });
    const [fetchRepos, { isLoading: areReposLoading, data: reposData }] = useLazyGetUserReposQuery();

    useEffect(() => {
        setDropdownOpen(debouncedSearch.length > 2 && data?.length! > 0);
    }, [debouncedSearch, data]);

    const clickHandler = (username: string) => {
        fetchRepos(username);
        setDropdownOpen(false);
    }

    return (
        <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
            {
                isError && <p className='text-center text-red-600'>Error</p>
            }

            <div className='relative w-[560px]'>
                <input
                    type="text"
                    className="border py-2 px-4 w-full h-[42px] mb-2"
                    placeholder="Search users"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                { dropdownOpen && (
                    <ul className='absolute top-[42px] left-0 right-0 max-h-[400px] shadow-md bg-white overflow-y-scroll'>
                        { isLoading && <p className='text-center text-gray-600'>Loading...</p> }
                        { data?.map(user => (
                            <li
                                key={user.id}
                                className='flex items-center px-2 py-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'
                                onClick={() => clickHandler(user.login)}
                            >
                                <img src={user.avatar_url} alt='avatar' className='w-8 h-8 rounded-full' />
                                <span className='ml-2'>{user.login}</span>
                            </li>
                        )) }
                    </ul>
                )}
                <div className="container">
                    { areReposLoading && <p className='text-center text-gray-600'>Loading...</p> }
                    { reposData?.map(repo => (
                        <RepoCard repo={repo} key={repo.id} />
                    )) }
                </div>
            </div>
        </div>
    );
};

export default HomePage;
