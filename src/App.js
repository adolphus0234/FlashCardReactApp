import React, { Component } from 'react';
import CrystalParallax from './components/CrystalParallax';
import ViewCards from './components/ViewCard/ViewCards';
import HomeScreen from './components/HomeScreen/HomeScreen';
import SetupScreen from './components/SetupScreen/SetupScreen';
import './App.css';

class App extends Component {
    constructor() {
        super();

        if (JSON.parse(localStorage.getItem('_flashCards')) !== null) {
            this.state = {
                route: 'home',
                flashCardCollection: JSON.parse(localStorage.getItem('_flashCards'))
            }
        } else {
            this.state = {
                route: 'home',
                flashCardCollection: []
            }
        }

        // resets printed lines array for each flashcard (will find a better solution later)
        if (this.state.flashCardCollection.length > 0) {
            this.state.flashCardCollection.forEach(flashCard => {
                flashCard.printedLines = []; 
            });
        } 

        // binding functions to access 'this'
        this.btnHome = this.btnHome.bind(this);
        this.btnStart = this.btnStart.bind(this);
        this.btnSetup = this.btnSetup.bind(this);
        this.deleteAllFlashCards = this.deleteAllFlashCards.bind(this);

    }

    btnHome() {
        this.setState({
            route: "home"
        });
    }

    btnStart() {
        this.setState({
            route: "flashcards"
        });
    }

    btnSetup() {
        this.setState({
            route: "setup"
        });
    }

    deleteAllFlashCards() {
        let result = window.confirm("Are you sure you want to delete all cards?");

        if (result) {
            localStorage.clear();
            
            this.setState({
                flashCardCollection: []
            })       
        }
    }

    render() { 

        const { route, flashCardCollection } = this.state;

        return (
            <div className="App">
                <CrystalParallax />

                <div className="inner-body">
                {
                    route === 'flashcards' ? 

                        <ViewCards flashCardCollection={flashCardCollection} 
                            onClickHome={this.btnHome} />

                    : (route === 'home' ?

                        <HomeScreen flashCardCollection={flashCardCollection} 
                            onClickStart={this.btnStart} onClickSetup={this.btnSetup} />

                        : (route === 'setup' ?

                            <SetupScreen  
                                flashCardCollection={flashCardCollection}
                                onClickHome={this.btnHome} 
                                onClickDeleteAllCards={this.deleteAllFlashCards} />

                            : <div className="center"><h1 className='error'>Error Loading App...</h1></div>
                    )) 
                }
                </div>
            </div>
        );
    }
}

export default App;
