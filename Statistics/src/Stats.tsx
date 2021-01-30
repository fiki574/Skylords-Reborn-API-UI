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
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <CountComponent url="/api/accounts" title="Registered accounts" />
          <CountComponent url="/api/sessions" title="Online players" />
          <CountComponent url="/api/matches" title="Running matches" />
          <CountComponent
            url="/api/matches/players"
            title="Total players in matches"
          />
          <CountComponent url="/api/quests/active" title="Active quests" />
          <CountComponent
            url="/api/quests/completed"
            title="Completed quests"
          />
          <CountComponent url="/api/quests/rerolled" title="Rerolled quests" />
          <CountComponent url="/api/auctions" title="Live auctions" />
          <CountComponent url="/api/boosters" title="Unopened boosters" />
          <CountComponent url="/api/boosters/opened" title="Opened boosters" />
          <CountComponent
            url="/api/boosters/spent"
            title="Total BFP spent on boosters"
          />
          <CountComponent url="/api/cards" title="Owned cards" />
          <CountComponent url="/api/upgrades" title="Owned card upgrades" />
          <CountComponent url="/api/decks" title="Unique decks" />
          <CountComponent url="/api/mails" title="Sent mails" />
          <CountComponent
            url="/api/transactions"
            title="Completed game transactions"
          />
          <CountComponent url="/api/scratch" title="Total scratch codes used" />
          <CountComponent
            url="/api/auctions/watchers"
            title="Total number of players watching auctions"
          />
          <CountComponent url="/api/experience" title="Total experience" />
          <CountComponent url="/api/elo" title="Total PvP ELO" />
          <CountComponent url="/api/gold" title="Total gold" />
          <CountComponent url="/api/bfp" title="Total BFP" />
          <CountComponent
            url="/api/friendlist"
            title="Total number of players in friends lists"
          />
          <CountComponent
            url="/api/mutelist"
            title="Total number of players on mute"
          />
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
          <CountComponent
            url="/api/matches/1rpve"
            title="1-player Random PvE matches won"
          />
          <CountComponent
            url="/api/matches/2rpve"
            title="2-player Random PvE matches won"
          />
          <CountComponent
            url="/api/matches/4rpve"
            title="4-player Random PvE matches won"
          />
          <CountComponent
            url="/api/matches/1cpve"
            title="1-player Community PvE matches won"
          />
          <CountComponent
            url="/api/matches/2cpve"
            title="2-player Community PvE matches won"
          />
          <CountComponent
            url="/api/matches/4cpve"
            title="4-player Community PvE matches won"
          />
          <CountComponent url="/api/matches/1v1" title="1v1 PvP matches won" />
          <CountComponent url="/api/matches/2v2" title="2v2 PvP matches won" />
          <CountComponent
            url="/api/matches/c1v1"
            title="1v1 PvP Community matches played"
          />
          <CountComponent
            url="/api/matches/c2v2"
            title="2v2 PvP Community matches played"
          />
          <CountComponent
            url="/api/matches/c3v3"
            title="3v3 PvP Community matches played"
          />
        </tbody>
      </Table>
    </div>
  );
}

export default Stats;
