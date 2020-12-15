import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import CountComponent from "./components/CountComponent";

function Stats() {
  return (
    <div className="row">
      <Table striped bordered hover variant="dark" responsive>
        <thead>
          <tr>
            <th>Stat</th>
            <th>Live</th>
            <th>Test</th>
          </tr>
        </thead>
        <tbody>
          <CountComponent url="/api/accounts" title="Registered accounts" />
          <CountComponent url="/api/sessions" title="Online players" />
          <CountComponent url="/api/matches" title="Running matches" />
          <CountComponent url="/api/quests/active" title="Active quests" />
          <CountComponent url="/api/auctions" title="Live auctions" />
          <CountComponent url="/api/boosters" title="Unopened boosters" />
          <CountComponent url="/api/cards" title="Owned cards" />
          <CountComponent url="/api/upgrades" title="Owned card upgrades" />
          <CountComponent url="/api/avatars" title="Owned avatars" />
          <CountComponent url="/api/decks" title="Unique decks" />
          <CountComponent url="/api/mails" title="Sent mails" />
          <CountComponent
            url="/api/transactions"
            title="Completed game transactions"
          />
          <CountComponent
            url="/api/boosters/types"
            title="Available booster types"
          />
          <CountComponent url="/api/experience" title="Total experience" />
          <CountComponent url="/api/elo" title="Total PvP ELO" />
          <CountComponent url="/api/gold" title="Total gold" />
          <CountComponent url="/api/bfp" title="Total BFP" />
          <CountComponent
            url="/api/matches/1pve"
            title="1-player PvE matches won"
          />
          <CountComponent
            url="/api/matches/2pve"
            title="2-player PvE matches won"
          />
          <CountComponent
            url="/api/matches/4pve"
            title="4-player PvE matches won"
          />
          <CountComponent
            url="/api/matches/12pve"
            title="12-player PvE matches won"
          />
          <CountComponent url="/api/matches/1v1" title="1v1 PvP matches won" />
          <CountComponent url="/api/matches/2v2" title="2v2 PvP matches won" />
        </tbody>
      </Table>
    </div>
  );
}

export default Stats;
