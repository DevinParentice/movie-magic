// Import React
import React from "react";

// Import Next.js libraries
import { GetServerSideProps } from "next";
import { withRouter, NextRouter } from "next/router";
import Head from "next/head";

// Import React Components
import Footer from "../../components/Footer";

// Import utility files
import formatDate from "../../utils/formatDate";
import styles from "../../styles/modules/Movie.module.scss";

// Initialize a formatter to format budget and revenue of the movie to USD
const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

interface WithRouterProps {
	router: NextRouter;
}

interface MyComponentProps extends WithRouterProps {}
class MoviePage extends React.Component<MyComponentProps, any> {
	// Set component's state
	constructor(props) {
		super(props);

		this.state = {
			movie: props.movie,
			people: props.people,
			peopleDisplay: props.peopleDisplay,
			loading: true,
			active: "Cast",
			smallScreen: false,
		};
	}

	// Check window's width when component first mounts
	componentDidMount() {
		const width = window.innerWidth;
		if (width < 800) {
			this.setState({ smallScreen: true });
		}
	}

	// Format the genres into something more readable
	formatGenres() {
		let genres = "";
		this.state.movie.genres &&
			this.state.movie.genres.map((genre) => {
				genres += `${genre.name}, `;
			});
		return genres.slice(0, -2);
	}

	render() {
		return (
			<div>
				{/* Add appropriate items to <head> element  */}
				<Head>
					<title>Movie Magic - {this.state.movie.title}</title>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<meta
						name="description"
						content="Movie Magic is the new way to search for the movies you are looking for."
					/>
				</Head>
				<div className={styles.content_wrapper}>
					<div className={styles.movie_details}>
						<div className={styles.backdrop}>
							{this.state.movie.backdrop_path ? (
								<div
									className={styles.poster_container}
									style={{
										backgroundImage: this.state.smallScreen
											? `linear-gradient(to bottom, transparent, #14181c),
										url("https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${this.state.movie.backdrop_path}")`
											: `linear-gradient(to bottom, transparent, #14181c),
									linear-gradient(to right, transparent 80%, #14181c),
									linear-gradient(to left, transparent 80%, #14181c),
									url("https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${this.state.movie.backdrop_path}")`,
									}}
								>
									<div className={styles.mobile_header}>
										<a href="/">
											<img
												className={styles.home_button}
												src="/home256.png"
												alt="Home button"
											/>
										</a>
									</div>
								</div>
							) : (
								<div
									className={styles.poster_container}
									style={{
										backgroundImage: this.state.smallScreen
											? `linear-gradient(to bottom, transparent, #14181c),
										url("/NoBackdrop.png")`
											: `linear-gradient(to bottom, transparent, #14181c),
									linear-gradient(to right, transparent 80%, #14181c),
									linear-gradient(to left, transparent 80%, #14181c),
									url("/NoBackdrop.png")`,
									}}
								></div>
							)}
						</div>

						<div>
							<h1 className={styles.movie_title}>{this.state.movie.title}</h1>
							<h2 className={styles.release_date}>
								Released {formatDate(this.state.movie.release_date)}
							</h2>
							{/* Iterate over crew members and display each one */}
							{this.state.people.crew &&
								this.state.people.crew.map((castMember) => {
									if (castMember.job === "Director") {
										return (
											<h2
												key={castMember.credit_id}
												className={styles.directed_by}
											>
												Dir. by{" "}
												<a href={`/person/${castMember.id}`}>
													{castMember.name}
												</a>
											</h2>
										);
									}
								})}
							<div className={styles.information_collection}>
								<div className={styles.information_details}>
									<div className={styles.genres}>
										<h3>{this.formatGenres()}</h3>
										<h4>
											Rating: {this.state.movie.vote_average}{" "}
											<img
												src="/star256.png"
												alt="Star icon"
												className={styles.gold_star}
											/>
										</h4>
										{this.state.movie.videos.results[0] ? (
											<h4 className={styles.view_trailer_button}>
												<a
													href={`https://www.youtube.com/watch?v=${this.state.movie.videos.results[0].key}`}
													target="_blank"
												>
													View Trailer
												</a>
											</h4>
										) : (
											<div></div>
										)}
									</div>

									{this.state.movie.poster_path ? (
										<img
											src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${this.state.movie.poster_path}`}
											alt={`${this.state.movie.title} Poster`}
											className={styles.poster}
										/>
									) : (
										<img src="/NoPoster.png" alt="No Poster Found" />
									)}
									<div className={styles.overview_container}>
										<h4 className={styles.tagline}>
											{this.state.movie.tagline}
										</h4>
										<p>{this.state.movie.overview}</p>
									</div>
								</div>
							</div>
							<div className={styles.details_collection}>
								<p>Runtime: {this.state.movie.runtime} minutes</p>
								<p>
									Budget:{" "}
									{formatter.format(this.state.movie.budget).slice(0, -3)}
									<br />
									Revenue:{" "}
									{formatter.format(this.state.movie.revenue).slice(0, -3)}
								</p>
							</div>
						</div>
					</div>
					<div className={styles.people_selector}>
						<ul className={styles.content_selector}>
							<li
								onClick={() => {
									this.setState({
										peopleDisplay: this.state.people.cast,
										active: "Cast",
									});
								}}
								className={this.state.active === "Cast" ? styles.active : ""}
							>
								Cast
							</li>
							<li
								onClick={() => {
									this.setState({
										peopleDisplay: this.state.people.crew,
										active: "Crew",
									});
								}}
								className={this.state.active === "Crew" ? styles.active : ""}
							>
								Crew
							</li>
						</ul>
					</div>
					<div className={styles.card_container}>
						{this.state.peopleDisplay &&
							// Display each card for every person
							this.state.peopleDisplay.map((person, index) => {
								if (person.character) {
									return (
										<div className={styles.card} key={index}>
											<a href={`/person/${person.id}`} className="person-link">
												{person.profile_path ? (
													<div className={styles.no_poster_container}>
														<img
															src={`https://www.themoviedb.org/t/p/w276_and_h350_face${person.profile_path}`}
															alt={`Picture of ${person.name}`}
														/>
													</div>
												) : (
													<div className={styles.no_poster_container}>
														<img src="/NoPerson.png" alt="No Picture Found" />
													</div>
												)}
												<div className={styles.name_container}>
													<p className={styles.card_name}>{person.name}</p>
													<p className={styles.card_character}>
														{person.character}
													</p>
												</div>
											</a>
										</div>
									);
								} else {
									return (
										<div className={styles.card} key={index}>
											<a href={`/person/${person.id}`} className="person-link">
												{person.profile_path ? (
													<div className={styles.no_poster_container}>
														<img
															src={`https://www.themoviedb.org/t/p/w276_and_h350_face${person.profile_path}`}
															alt={`Picture of ${person.name}`}
														/>
													</div>
												) : (
													<div className={styles.no_poster_container}>
														<img src="/NoPerson.png" alt="No Poster Found" />
													</div>
												)}
												<div className={styles.name_container}>
													<p className={styles.card_name}>{person.name}</p>
													<p className={styles.card_character}>{person.job}</p>
												</div>
											</a>
										</div>
									);
								}
							})}
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	// Fetch movie information from API
	const movieUrl = `https://api.themoviedb.org/3/movie/${query.movieID}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=videos`;
	const res1 = await fetch(movieUrl);
	const movie = await res1.json();

	// Fetch cast & crew information from API
	const peopleUrl = `https://api.themoviedb.org/3/movie/${query.movieID}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
	const res2 = await fetch(peopleUrl);
	const people = await res2.json();

	const peopleDisplay = people.cast;

	// Pass API results to component's props
	return {
		props: {
			movie,
			people,
			peopleDisplay,
		},
	};
};

export default withRouter(MoviePage);
