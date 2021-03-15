import React, { useState, useContext } from "react";
import PropTypes from 'prop-types';
import SpotifyContext from "./SpotifyContext";

export function ReziReferences(props) {

    const { spotifyInfo, setSpotifyInfo } = useContext(SpotifyContext);
    const [ followedReferences, setFollowedReferences ] = useState([]);

    if (followedReferences.length == 0 && spotifyInfo.followedArtists && spotifyInfo.followedArtists.length > 0) {
        const tempFollowedReferences = []
        for (const artist of spotifyInfo.followedArtists) {
            if (props.references.includes(artist)) {
                tempFollowedReferences.push(artist)
            }
        }
        if (tempFollowedReferences.length > 0) setFollowedReferences(tempFollowedReferences);
    }

    const followedReferencesDiv = followedReferences.length > 0
        ? followedReferences.map(ref => <div key={ref} className="followedReference">{ref}</div> )
        : ""

    return <div className="references">{followedReferencesDiv}<div className="allReferences" >{props.references}</div></div>
}

ReziReferences.propTypes = {
    references: PropTypes.string
}