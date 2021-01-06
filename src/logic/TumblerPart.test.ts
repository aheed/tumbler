import React from 'react';
import { IBallReceiver, ITumblerPartObserver, TumblerBallColor, TumblerEvent, TumblerResult } from "./TumblerTypes";
import { TumblerCrossover, TumblerRamp } from './TumblerPart';


class BallReceiverSpy implements IBallReceiver {
    //receivedColor?: TumblerBallColor;
    receivedBalls = 0;
    putBall = async (c: TumblerBallColor) => {
        ++this.receivedBalls;
        return c === TumblerBallColor.Blue ? 
            TumblerResult.BlueBallIntercepted :
            TumblerResult.RedBallIntercepted;
    };
}

class ObserverSpy implements ITumblerPartObserver {
    lastObservedEvent: TumblerEvent = TumblerEvent.None;

    reportEvent = async (evt: TumblerEvent) => {
        this.lastObservedEvent = evt;
        console.log(TumblerEvent[evt]);
    }
}

test('ramp faces left, blue ball inserted, blue ball comes out left', async () => {
    // Arrange
    let left = new BallReceiverSpy();
    let right = new BallReceiverSpy();
    let ramp = new TumblerRamp(left, right, true);

    // Act
    let res = await ramp.leftEntrance.putBall(TumblerBallColor.Blue);

    // Evaluate
    expect(res).toBe(TumblerResult.BlueBallIntercepted);
    expect(left.receivedBalls).toBe(1);
    expect(right.receivedBalls).toBe(0);
});

test('ramp faces right, blue ball inserted, blue ball comes out right', async () => {
    // Arrange
    let left = new BallReceiverSpy();
    let right = new BallReceiverSpy();
    let ramp = new TumblerRamp(left, right, false);

    // Act
    let res = await ramp.leftEntrance.putBall(TumblerBallColor.Blue);

    // Evaluate
    expect(res).toBe(TumblerResult.BlueBallIntercepted);
    expect(left.receivedBalls).toBe(0);
    expect(right.receivedBalls).toBe(1);
});

test('ramp faces right, blue ball inserted, RampRight event reported', async () => {
    // Arrange
    let left = new BallReceiverSpy();
    let right = new BallReceiverSpy();
    let ramp = new TumblerRamp(left, right, false);
    let obsSpy = new ObserverSpy();
    ramp.addObserver(obsSpy);

    // Act
    let res = await ramp.leftEntrance.putBall(TumblerBallColor.Blue);

    // Evaluate
    expect(obsSpy.lastObservedEvent).toBe(TumblerEvent.RampRight);
});

test('crossover, blue ball inserted right, blue ball comes out left', async () => {
    // Arrange
    let left = new BallReceiverSpy();
    let right = new BallReceiverSpy();
    let co = new TumblerCrossover(left, right);

    // Act
    let res = await co.rightEntrance.putBall(TumblerBallColor.Blue);

    // Evaluate
    expect(res).toBe(TumblerResult.BlueBallIntercepted);
    expect(left.receivedBalls).toBe(1);
    expect(right.receivedBalls).toBe(0);
});

test('crossover, red ball inserted left, red ball comes out right', async () => {
    // Arrange
    let left = new BallReceiverSpy();
    let right = new BallReceiverSpy();
    let co = new TumblerCrossover(left, right);

    // Act
    let res = await co.leftEntrance.putBall(TumblerBallColor.Red);

    // Evaluate
    expect(res).toBe(TumblerResult.RedBallIntercepted);
    expect(left.receivedBalls).toBe(0);
    expect(right.receivedBalls).toBe(1);
});
