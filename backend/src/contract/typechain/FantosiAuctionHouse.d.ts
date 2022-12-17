/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from 'ethers';
import { BytesLike } from '@ethersproject/bytes';
import { Listener, Provider } from '@ethersproject/providers';
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi';
import { TypedEventFilter, TypedEvent, TypedListener } from './commons';

interface FantosiAuctionHouseInterface extends ethers.utils.Interface {
  functions: {
    'auction()': FunctionFragment;
    'createBid(uint256)': FunctionFragment;
    'duration()': FunctionFragment;
    'fantosiToken()': FunctionFragment;
    'initialize(address,address,uint256,uint256,uint8,uint256)': FunctionFragment;
    'minBidIncrementPercentage()': FunctionFragment;
    'owner()': FunctionFragment;
    'pause()': FunctionFragment;
    'paused()': FunctionFragment;
    'renounceOwnership()': FunctionFragment;
    'reservePrice()': FunctionFragment;
    'setMinBidIncrementPercentage(uint8)': FunctionFragment;
    'setReservePrice(uint256)': FunctionFragment;
    'setTimeBuffer(uint256)': FunctionFragment;
    'settleAuction()': FunctionFragment;
    'settleCurrentAndCreateNewAuction()': FunctionFragment;
    'timeBuffer()': FunctionFragment;
    'transferOwnership(address)': FunctionFragment;
    'unpause()': FunctionFragment;
    'wBNB()': FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'auction', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'createBid',
    values: [BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: 'duration', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'fantosiToken',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'initialize',
    values: [
      string,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: 'minBidIncrementPercentage',
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'pause', values?: undefined): string;
  encodeFunctionData(functionFragment: 'paused', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'renounceOwnership',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'reservePrice',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'setMinBidIncrementPercentage',
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: 'setReservePrice',
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: 'setTimeBuffer',
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: 'settleAuction',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'settleCurrentAndCreateNewAuction',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'timeBuffer',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'transferOwnership',
    values: [string],
  ): string;
  encodeFunctionData(functionFragment: 'unpause', values?: undefined): string;
  encodeFunctionData(functionFragment: 'wBNB', values?: undefined): string;

  decodeFunctionResult(functionFragment: 'auction', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'createBid', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'duration', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'fantosiToken',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'initialize', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'minBidIncrementPercentage',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'pause', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'paused', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'renounceOwnership',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'reservePrice',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'setMinBidIncrementPercentage',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'setReservePrice',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'setTimeBuffer',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'settleAuction',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'settleCurrentAndCreateNewAuction',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'timeBuffer', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'transferOwnership',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'unpause', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'wBNB', data: BytesLike): Result;

  events: {
    'AuctionBid(uint256,address,uint256,bool)': EventFragment;
    'AuctionCreated(uint256,uint256,uint256)': EventFragment;
    'AuctionExtended(uint256,uint256)': EventFragment;
    'AuctionMinBidIncrementPercentageUpdated(uint256)': EventFragment;
    'AuctionReservePriceUpdated(uint256)': EventFragment;
    'AuctionSettled(uint256,address,uint256)': EventFragment;
    'AuctionTimeBufferUpdated(uint256)': EventFragment;
    'Initialized(uint8)': EventFragment;
    'OwnershipTransferred(address,address)': EventFragment;
    'Paused(address)': EventFragment;
    'Unpaused(address)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'AuctionBid'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AuctionCreated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AuctionExtended'): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: 'AuctionMinBidIncrementPercentageUpdated',
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AuctionReservePriceUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AuctionSettled'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AuctionTimeBufferUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Initialized'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OwnershipTransferred'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Paused'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Unpaused'): EventFragment;
}

export class FantosiAuctionHouse extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>,
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>,
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>,
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>,
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>,
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: FantosiAuctionHouseInterface;

  functions: {
    auction(overrides?: CallOverrides): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, string, boolean] & {
        photoCardId: BigNumber;
        amount: BigNumber;
        startTime: BigNumber;
        endTime: BigNumber;
        bidder: string;
        settled: boolean;
      }
    >;

    createBid(
      photoCardId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    duration(overrides?: CallOverrides): Promise<[BigNumber]>;

    fantosiToken(overrides?: CallOverrides): Promise<[string]>;

    initialize(
      _fantosiToken: string,
      _wBNB: string,
      _timeBuffer: BigNumberish,
      _reservePrice: BigNumberish,
      _minBidIncrementPercentage: BigNumberish,
      _duration: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    minBidIncrementPercentage(overrides?: CallOverrides): Promise<[number]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pause(
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    paused(overrides?: CallOverrides): Promise<[boolean]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    reservePrice(overrides?: CallOverrides): Promise<[BigNumber]>;

    setMinBidIncrementPercentage(
      _minBidIncrementPercentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    setReservePrice(
      _reservePrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    setTimeBuffer(
      _timeBuffer: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    settleAuction(
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    settleCurrentAndCreateNewAuction(
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    timeBuffer(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    unpause(
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    wBNB(overrides?: CallOverrides): Promise<[string]>;
  };

  auction(overrides?: CallOverrides): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber, string, boolean] & {
      photoCardId: BigNumber;
      amount: BigNumber;
      startTime: BigNumber;
      endTime: BigNumber;
      bidder: string;
      settled: boolean;
    }
  >;

  createBid(
    photoCardId: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  duration(overrides?: CallOverrides): Promise<BigNumber>;

  fantosiToken(overrides?: CallOverrides): Promise<string>;

  initialize(
    _fantosiToken: string,
    _wBNB: string,
    _timeBuffer: BigNumberish,
    _reservePrice: BigNumberish,
    _minBidIncrementPercentage: BigNumberish,
    _duration: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  minBidIncrementPercentage(overrides?: CallOverrides): Promise<number>;

  owner(overrides?: CallOverrides): Promise<string>;

  pause(
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  paused(overrides?: CallOverrides): Promise<boolean>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  reservePrice(overrides?: CallOverrides): Promise<BigNumber>;

  setMinBidIncrementPercentage(
    _minBidIncrementPercentage: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  setReservePrice(
    _reservePrice: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  setTimeBuffer(
    _timeBuffer: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  settleAuction(
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  settleCurrentAndCreateNewAuction(
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  timeBuffer(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  unpause(
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  wBNB(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    auction(overrides?: CallOverrides): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, string, boolean] & {
        photoCardId: BigNumber;
        amount: BigNumber;
        startTime: BigNumber;
        endTime: BigNumber;
        bidder: string;
        settled: boolean;
      }
    >;

    createBid(
      photoCardId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;

    duration(overrides?: CallOverrides): Promise<BigNumber>;

    fantosiToken(overrides?: CallOverrides): Promise<string>;

    initialize(
      _fantosiToken: string,
      _wBNB: string,
      _timeBuffer: BigNumberish,
      _reservePrice: BigNumberish,
      _minBidIncrementPercentage: BigNumberish,
      _duration: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;

    minBidIncrementPercentage(overrides?: CallOverrides): Promise<number>;

    owner(overrides?: CallOverrides): Promise<string>;

    pause(overrides?: CallOverrides): Promise<void>;

    paused(overrides?: CallOverrides): Promise<boolean>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    reservePrice(overrides?: CallOverrides): Promise<BigNumber>;

    setMinBidIncrementPercentage(
      _minBidIncrementPercentage: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;

    setReservePrice(
      _reservePrice: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;

    setTimeBuffer(
      _timeBuffer: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;

    settleAuction(overrides?: CallOverrides): Promise<void>;

    settleCurrentAndCreateNewAuction(overrides?: CallOverrides): Promise<void>;

    timeBuffer(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides,
    ): Promise<void>;

    unpause(overrides?: CallOverrides): Promise<void>;

    wBNB(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    AuctionBid(
      photoCardId?: BigNumberish | null,
      sender?: null,
      value?: null,
      extended?: null,
    ): TypedEventFilter<
      [BigNumber, string, BigNumber, boolean],
      {
        photoCardId: BigNumber;
        sender: string;
        value: BigNumber;
        extended: boolean;
      }
    >;

    AuctionCreated(
      photoCardId?: BigNumberish | null,
      startTime?: null,
      endTime?: null,
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber],
      { photoCardId: BigNumber; startTime: BigNumber; endTime: BigNumber }
    >;

    AuctionExtended(
      photoCardId?: BigNumberish | null,
      endTime?: null,
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { photoCardId: BigNumber; endTime: BigNumber }
    >;

    AuctionMinBidIncrementPercentageUpdated(
      minBidIncrementPercentage?: null,
    ): TypedEventFilter<[BigNumber], { minBidIncrementPercentage: BigNumber }>;

    AuctionReservePriceUpdated(
      reservePrice?: null,
    ): TypedEventFilter<[BigNumber], { reservePrice: BigNumber }>;

    AuctionSettled(
      photoCardId?: BigNumberish | null,
      winner?: null,
      amount?: null,
    ): TypedEventFilter<
      [BigNumber, string, BigNumber],
      { photoCardId: BigNumber; winner: string; amount: BigNumber }
    >;

    AuctionTimeBufferUpdated(
      timeBuffer?: null,
    ): TypedEventFilter<[BigNumber], { timeBuffer: BigNumber }>;

    Initialized(
      version?: null,
    ): TypedEventFilter<[number], { version: number }>;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null,
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    Paused(account?: null): TypedEventFilter<[string], { account: string }>;

    Unpaused(account?: null): TypedEventFilter<[string], { account: string }>;
  };

  estimateGas: {
    auction(overrides?: CallOverrides): Promise<BigNumber>;

    createBid(
      photoCardId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    duration(overrides?: CallOverrides): Promise<BigNumber>;

    fantosiToken(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      _fantosiToken: string,
      _wBNB: string,
      _timeBuffer: BigNumberish,
      _reservePrice: BigNumberish,
      _minBidIncrementPercentage: BigNumberish,
      _duration: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    minBidIncrementPercentage(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pause(
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    paused(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    reservePrice(overrides?: CallOverrides): Promise<BigNumber>;

    setMinBidIncrementPercentage(
      _minBidIncrementPercentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    setReservePrice(
      _reservePrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    setTimeBuffer(
      _timeBuffer: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    settleAuction(
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    settleCurrentAndCreateNewAuction(
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    timeBuffer(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    unpause(
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    wBNB(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    auction(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    createBid(
      photoCardId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    duration(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    fantosiToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initialize(
      _fantosiToken: string,
      _wBNB: string,
      _timeBuffer: BigNumberish,
      _reservePrice: BigNumberish,
      _minBidIncrementPercentage: BigNumberish,
      _duration: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    minBidIncrementPercentage(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pause(
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    reservePrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setMinBidIncrementPercentage(
      _minBidIncrementPercentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    setReservePrice(
      _reservePrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    setTimeBuffer(
      _timeBuffer: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    settleAuction(
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    settleCurrentAndCreateNewAuction(
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    timeBuffer(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    unpause(
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    wBNB(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
