import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { NextPageWithLayout } from '../_app'

import Layout from '../../components/layout/Layout'
import NavTab from '../../components/layout/NavTab'
import TokenInput from '../../components/Trade/TokenInput'
import TokensModal from '../../components/Trade/TokensModal'
import CardContainer from '../../components/Trade/CardContainer'
import LoadingButton from '../../components/layout/LoadingButton'
import InfoBanner from '../../components/layout/InfoBanner'
import ArrowsDown from '../../components/icons/ArrowsDown'

import { useAlert } from '../../contexts/AlertContext'
import wrappedTokensList from '../../config/constants/wrappedTokensList.json'
import { Token, Token1155, Token20 } from '../../typings/Token'
import { useTronWeb } from '../../contexts/TronWebContext'
import { convertToHex } from '../../lib/tronweb'
import { getAddress } from '../../config/addresses'

const Convert: NextPageWithLayout = () => {
  const [wrapToken, setWrapToken] = useState(wrappedTokensList.unWrapped[0])
  const [unWrapToken, setUnWrapToken] = useState(wrappedTokensList.wrapped[0])
  const [wrapAmount, setWrapAmount] = useState('')
  const [unWrapAmount, setUnWrapAmount] = useState('')

  const [showWrapModal, setShowWrapModal] = useState(false)
  const [showUnWrapModal, setShowUnWrapModal] = useState(false)

  const [wrapLoading, setWrapLoading] = useState(false)
  const [unWrapLoading, setUnWrapLoading] = useState(false)

  const { toggleAlert } = useAlert()
  const { tronWeb, getContractInstance, address, chain } = useTronWeb()

  const handleShowWrapModal = (isTokenA?: boolean) => {
    setShowWrapModal((prev) => !prev)
  }
  const handleShowUnWrapModal = (isTokenA?: boolean) => {
    setShowUnWrapModal((prev) => !prev)
  }

  const handleWrapTokenChange = (token: Token) => {
    setWrapToken(token as Token20)
    setShowWrapModal(false)
  }
  const handleUnWrapTokenChange = (token: Token) => {
    setUnWrapToken(token as Token1155)
    setShowUnWrapModal(false)
  }

  const handleWrapAmountChange = (amount: string) => {
    setWrapAmount(amount)
  }
  const handleUnWrapAmountChange = (amount: string) => {
    setUnWrapAmount(amount)
  }

  const onConvertWrapTokens = async () => {
    setWrapLoading(true)

    try {
      const spacePiratesWrapper = await getContractInstance(
        'wrapperContract',
        'wrapperContract',
      )

      if (wrapToken.symbol === 'TRX') {
        await spacePiratesWrapper.ethDeposit().send({
          callValue: tronWeb.toSun(wrapAmount),
          shouldPollResponse: true,
        })
      } else {
        await spacePiratesWrapper
          .erc20Deposit(wrapToken.address, convertToHex(wrapAmount, 1e18))
          .send({ shouldPollResponse: true })
      }

      toggleAlert(
        `Successfully minted ${wrapAmount} ${wrapToken.symbol}`,
        'success',
      )
    } catch (err) {
      toggleAlert('Error during the conversion. Try again', 'error')
    } finally {
      setWrapLoading(false)
    }
  }

  const onConvertUnWrapTokens = async () => {
    setUnWrapLoading(true)

    try {
      const spacePiratesTokens = await getContractInstance(
        'tokensContract',
        'tokensContract',
      )

      const isApproved = await spacePiratesTokens
        .isApprovedForAll(address, getAddress('wrapperContract', chain))
        .call()

      !isApproved &&
        (await spacePiratesTokens
          .setApprovalForAll(getAddress('wrapperContract', chain), true)
          .send())

      const spacePiratesWrapper = await getContractInstance(
        'wrapperContract',
        'wrapperContract',
      )

      const token = wrappedTokensList.unWrapped.find(
        (token) => token.symbol === unWrapToken.symbol.replace('SP-', ''),
      )

      if (token!.symbol === 'TRX') {
        await spacePiratesWrapper
          .ethWithdraw(convertToHex(unWrapAmount, 1e6))
          .send({
            shouldPollResponse: true,
          })
      } else {
        await spacePiratesWrapper
          .erc20Withdraw(token!.address, convertToHex(unWrapAmount, 1e18))
          .send({ shouldPollResponse: true })
      }

      toggleAlert(
        `Successfully redeemed ${unWrapAmount} ${token!.symbol}`,
        'success',
      )
    } catch (err) {
      toggleAlert('Error during the conversion. Try again', 'error')
    } finally {
      setUnWrapLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center gap-20 py-20">
      <Head>
        <title>Space Pirates Convert</title>
      </Head>

      <TokensModal
        showModal={showWrapModal}
        handleShowModal={handleShowWrapModal}
        handleTokenChange={handleWrapTokenChange}
        tokensList={wrappedTokensList.unWrapped}
      />
      <TokensModal
        showModal={showUnWrapModal}
        handleShowModal={handleShowUnWrapModal}
        handleTokenChange={handleUnWrapTokenChange}
        tokensList={wrappedTokensList.wrapped}
      />

      <CardContainer
        title="Wrap"
        subtitle="Convert TRC20 tokens into their wrapped version"
      >
        <div className="text-primary relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="360"
            height="110"
            viewBox="0 0 360 110"
          >
            <g transform="translate(-236.827 -118)">
              <path
                d="M304.5,0A54.5,54.5,0,1,1,250,54.5,54.5,54.5,0,0,1,304.5,0"
                transform="translate(236.827 118)"
                fill="#FFF8F1"
              />
              <path
                d="M54.5,0A54.5,54.5,0,1,1,0,54.5,54.5,54.5,0,0,1,54.5,0"
                transform="translate(236.827 118)"
                fill="#FFF8F1"
              />
              <path
                className="fill-current"
                d="M247.707,50.207a1,1,0,0,0,0-1.414l-6.364-6.364a1,1,0,0,0-1.414,1.414l5.657,5.657-5.657,5.657a1,1,0,0,0,1.414,1.414ZM247,48.5H112v2H247Z"
                transform="translate(236.827 118)"
              />
              <path
                d="M111.293,60.793a1,1,0,0,0,0,1.414l6.364,6.364a1,1,0,0,0,1.414-1.414L113.414,61.5l5.657-5.657a1,1,0,0,0-1.414-1.414ZM245.015,60.5a1,1,0,0,0,0,2Zm-3.971,2a1,1,0,0,0,0-2Zm-3.97-2a1,1,0,0,0,0,2Zm-3.971,2a1,1,0,0,0,0-2Zm-3.971-2a1,1,0,0,0,0,2Zm-3.97,2a1,1,0,0,0,0-2Zm-3.971-2a1,1,0,0,0,0,2Zm-3.97,2a1,1,0,0,0,0-2Zm-3.971-2a1,1,0,0,0,0,2Zm-3.971,2a1,1,0,0,0,0-2Zm-3.97-2a1,1,0,0,0,0,2Zm-3.971,2a1,1,0,1,0,0-2Zm-3.97-2a1,1,0,0,0,0,2Zm-3.971,2a1,1,0,0,0,0-2Zm-3.971-2a1,1,0,0,0,0,2Zm-3.97,2a1,1,0,0,0,0-2Zm-3.971-2a1,1,0,0,0,0,2Zm-3.97,2a1,1,0,0,0,0-2Zm-3.971-2a1,1,0,0,0,0,2Zm-3.97,2a1,1,0,0,0,0-2Zm-3.971-2a1,1,0,0,0,0,2Zm-3.971,2a1,1,0,0,0,0-2Zm-3.97-2a1,1,0,0,0,0,2Zm-3.971,2a1,1,0,0,0,0-2Zm-3.97-2a1,1,0,0,0,0,2Zm-3.971,2a1,1,0,0,0,0-2Zm-3.971-2a1,1,0,0,0,0,2Zm-3.97,2a1,1,0,0,0,0-2Zm-3.971-2a1,1,0,0,0,0,2Zm-3.97,2a1,1,0,0,0,0-2Zm-3.971-2a1,1,0,0,0,0,2Zm-3.971,2a1,1,0,0,0,0-2Zm-3.97-2a1,1,0,1,0,0,2Zm-3.971,2a1,1,0,1,0,0-2ZM247,60.5h-1.985v2H247Zm-5.956,0h-3.97v2h3.97Zm-7.941,0h-3.971v2H233.1Zm-7.941,0h-3.971v2h3.971Zm-7.941,0H213.25v2h3.971Zm-7.942,0h-3.97v2h3.97Zm-7.941,0h-3.97v2h3.97Zm-7.941,0h-3.971v2H193.4Zm-7.941,0h-3.971v2h3.971Zm-7.941,0h-3.971v2h3.971Zm-7.941,0H165.6v2h3.971Zm-7.942,0h-3.97v2h3.97Zm-7.941,0h-3.97v2h3.97Zm-7.941,0h-3.971v2h3.971Zm-7.941,0h-3.971v2h3.971Zm-7.941,0H125.9v2h3.971Zm-7.942,0h-3.97v2h3.97Zm-7.941,0H112v2h1.985Z"
                transform="translate(236.827 118)"
                fill="#c2c2c2"
              />
              <path
                className="fill-current"
                d="M156.5,14.5h46a4,4,0,0,1,4,4v15a4,4,0,0,1-4,4h-46a4,4,0,0,1-4-4v-15a4,4,0,0,1,4-4"
                transform="translate(236.827 118)"
              />
              <path
                d="M160.153,31.5h2.416V24.236l3.12,4.736h.064l3.152-4.784V31.5h2.448V20.3H168.7l-2.944,4.736L162.809,20.3h-2.656Zm13.7,0h2.464V20.3h-2.464Zm4.963,0h2.432V24.38l5.424,7.12h2.1V20.3h-2.432v6.9l-5.248-6.9h-2.272Zm14.949,0h2.464V22.572h3.408V20.3h-9.28v2.272h3.408Z"
                transform="translate(236.827 118)"
                fill="#FFF8F1"
              />
              <path
                d="M154,73.5h51a4,4,0,0,1,4,4v15a4,4,0,0,1-4,4H154a4,4,0,0,1-4-4v-15a4,4,0,0,1,4-4"
                transform="translate(236.827 118)"
                fill="#c2c2c2"
              />
              <path
                d="M157.372,90.5H162.7c2.528,0,4.192-1.024,4.192-3.072V87.4a2.737,2.737,0,0,0-2.1-2.752,2.6,2.6,0,0,0,1.472-2.416V82.2a2.569,2.569,0,0,0-.768-1.9,4.043,4.043,0,0,0-2.928-.992h-5.2Zm6.448-7.856c0,.832-.688,1.184-1.776,1.184h-2.272V81.46H162.2c1.04,0,1.616.416,1.616,1.152Zm.624,4.448v.032c0,.832-.656,1.216-1.744,1.216h-2.928V85.876h2.848c1.264,0,1.824.464,1.824,1.216m8.847,3.584c3.008,0,4.912-1.664,4.912-5.056V79.3h-2.464v6.416c0,1.776-.912,2.688-2.416,2.688s-2.416-.944-2.416-2.768V79.3h-2.464v6.4c0,3.3,1.84,4.976,4.848,4.976m7.122-.176h2.464V86.916h1.936l2.4,3.584h2.88l-2.736-4a3.478,3.478,0,0,0,2.4-3.472V83a3.516,3.516,0,0,0-.96-2.56,4.463,4.463,0,0,0-3.264-1.136h-5.12Zm2.464-5.76V81.524h2.448c1.2,0,1.936.544,1.936,1.6v.032c0,.944-.688,1.584-1.888,1.584Zm8.8,5.76h2.432V83.38l5.424,7.12h2.1V79.3H199.2v6.9l-5.248-6.9h-2.272Z"
                transform="translate(236.827 118)"
                fill="#FFF8F1"
              />
            </g>
          </svg>
          <div className="icon-abs-left w-[64px] h-[64px] translate-x-[-50%] translate-y-[-50%]">
            <Image src={wrapToken.logoURI} alt="token" height={64} width={64} />
          </div>
          <div className="icon-abs-right w-[64px] h-[64px] translate-x-[50%] translate-y-[-50%]">
            <Image src={wrapToken.logoURI} alt="token" height={64} width={64} />
          </div>
        </div>
        <InfoBanner>
          <span className="text-left font-semibold text-sm">
            The conversion ratio is 1:1
          </span>
          <span className="block text-sm font-light">
            Read more about wrapped tokens on the{' '}
            <span className="link">
              <Link href="wiki">Wiki</Link>
            </span>
          </span>
        </InfoBanner>
        <TokenInput
          handleShowModal={() => handleShowWrapModal(true)}
          amount={wrapAmount}
          handleAmountChange={handleWrapAmountChange}
          token={wrapToken}
        />
        <div className="flex justify-center border-0 my-4">
          <ArrowsDown />
        </div>
        <TokenInput
          amount={wrapAmount}
          token={{ ...wrapToken, symbol: `SP-${wrapToken.symbol}` }}
        />
        <div className="mt-8">
          <LoadingButton
            text={`Wrap`}
            loading={wrapLoading}
            onClick={() => onConvertWrapTokens()}
          />
        </div>
      </CardContainer>

      <CardContainer
        title="Un-Wrap"
        subtitle="Convert wrapped tokens into their TRC20 version"
      >
        <div className="text-primary relative m-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="359"
            height="109"
            viewBox="0 0 359 109"
          >
            <g transform="translate(-510.776 -300.451)">
              <path
                d="M307.276,165.451a54.5,54.5,0,1,1-54.5,54.5,54.5,54.5,0,0,1,54.5-54.5"
                transform="translate(508 135)"
                fill="#FFF8F1"
              />
              <path
                d="M57.276,165.451a54.5,54.5,0,1,1-54.5,54.5,54.5,54.5,0,0,1,54.5-54.5"
                transform="translate(508 135)"
                fill="#FFF8F1"
              />
              <path
                d="M250.483,215.658a1,1,0,0,0,0-1.414l-6.364-6.364a1,1,0,0,0-1.414,1.414l5.657,5.657-5.657,5.657a1,1,0,0,0,1.414,1.414Zm-2.692-1.707a1,1,0,0,0,0,2Zm-3.971,2a1,1,0,0,0,0-2Zm-3.97-2a1,1,0,0,0,0,2Zm-3.971,2a1,1,0,0,0,0-2Zm-3.971-2a1,1,0,0,0,0,2Zm-3.97,2a1,1,0,0,0,0-2Zm-3.971-2a1,1,0,0,0,0,2Zm-3.97,2a1,1,0,0,0,0-2Zm-3.971-2a1,1,0,0,0,0,2Zm-3.971,2a1,1,0,0,0,0-2Zm-3.97-2a1,1,0,0,0,0,2Zm-3.971,2a1,1,0,1,0,0-2Zm-3.97-2a1,1,0,0,0,0,2Zm-3.971,2a1,1,0,1,0,0-2Zm-3.971-2a1,1,0,1,0,0,2Zm-3.97,2a1,1,0,0,0,0-2Zm-3.971-2a1,1,0,1,0,0,2Zm-3.97,2a1,1,0,1,0,0-2Zm-3.971-2a1,1,0,0,0,0,2Zm-3.97,2a1,1,0,1,0,0-2Zm-3.971-2a1,1,0,1,0,0,2Zm-3.971,2a1,1,0,0,0,0-2Zm-3.97-2a1,1,0,1,0,0,2Zm-3.971,2a1,1,0,0,0,0-2Zm-3.97-2a1,1,0,0,0,0,2Zm-3.971,2a1,1,0,0,0,0-2Zm-3.971-2a1,1,0,0,0,0,2Zm-3.97,2a1,1,0,0,0,0-2Zm-3.971-2a1,1,0,0,0,0,2Zm-3.97,2a1,1,0,0,0,0-2Zm-3.971-2a1,1,0,1,0,0,2Zm-3.971,2a1,1,0,0,0,0-2Zm-3.97-2a1,1,0,1,0,0,2Zm-3.971,2a1,1,0,1,0,0-2Zm133.015-2h-1.985v2h1.985Zm-5.956,0h-3.97v2h3.97Zm-7.941,0h-3.971v2h3.971Zm-7.941,0h-3.971v2h3.971Zm-7.941,0h-3.971v2H220Zm-7.942,0h-3.97v2h3.97Zm-7.941,0h-3.97v2h3.97Zm-7.941,0H192.2v2h3.971Zm-7.941,0h-3.971v2h3.971Zm-7.941,0H176.32v2h3.971Zm-7.941,0h-3.971v2h3.971Zm-7.942,0h-3.97v2h3.97Zm-7.941,0H152.5v2h3.97Zm-7.941,0h-3.971v2h3.971Zm-7.941,0h-3.971v2h3.971Zm-7.941,0h-3.971v2h3.971Zm-7.942,0h-3.97v2h3.97Zm-7.941,0h-1.985v2h1.985Z"
                transform="translate(508 135)"
                fill="#c2c2c2"
              />
              <path
                className="fill-current"
                d="M114.069,226.244a1,1,0,0,0,0,1.414l6.364,6.364a1,1,0,0,0,1.414-1.414l-5.657-5.657,5.657-5.657a1,1,0,0,0-1.414-1.414Zm135.707-.293h-135v2h135Z"
                transform="translate(508 135)"
              />
              <path
                d="M159.276,179.951h46a4,4,0,0,1,4,4v15a4,4,0,0,1-4,4h-46a4,4,0,0,1-4-4v-15a4,4,0,0,1,4-4"
                transform="translate(508 135)"
                fill="#c2c2c2"
              />
              <path
                d="M162.929,196.951h2.416v-7.264l3.12,4.736h.064l3.152-4.784v7.312h2.448v-11.2h-2.656l-2.944,4.736-2.944-4.736h-2.656Zm13.7,0H179.1v-11.2h-2.464Zm4.963,0h2.432v-7.12l5.424,7.12h2.1v-11.2h-2.432v6.9l-5.248-6.9H181.6Zm14.949,0h2.464v-8.928h3.408v-2.272h-9.28v2.272h3.408Z"
                transform="translate(508 135)"
                fill="#FFF8F1"
              />
              <path
                className="fill-current"
                d="M156.776,238.951h51a4,4,0,0,1,4,4v15a4,4,0,0,1-4,4h-51a4,4,0,0,1-4-4v-15a4,4,0,0,1,4-4"
                transform="translate(508 135)"
              />
              <path
                d="M160.148,255.951h5.328c2.528,0,4.192-1.024,4.192-3.072v-.032a2.737,2.737,0,0,0-2.1-2.752,2.6,2.6,0,0,0,1.472-2.416v-.032a2.569,2.569,0,0,0-.768-1.9,4.043,4.043,0,0,0-2.928-.992h-5.2ZM166.6,248.1c0,.832-.688,1.184-1.776,1.184h-2.272v-2.368h2.432c1.04,0,1.616.416,1.616,1.152Zm.624,4.448v.032c0,.832-.656,1.216-1.744,1.216h-2.928v-2.464H165.4c1.264,0,1.824.464,1.824,1.216m8.847,3.584c3.008,0,4.912-1.664,4.912-5.056v-6.32h-2.464v6.416c0,1.776-.912,2.688-2.416,2.688s-2.416-.944-2.416-2.768v-6.336h-2.464v6.4c0,3.3,1.84,4.976,4.848,4.976m7.122-.176h2.464v-3.584h1.936l2.4,3.584h2.88l-2.736-4a3.478,3.478,0,0,0,2.4-3.472v-.032a3.516,3.516,0,0,0-.96-2.56,4.463,4.463,0,0,0-3.264-1.136h-5.12Zm2.464-5.76v-3.216H188.1c1.2,0,1.936.544,1.936,1.6v.032c0,.944-.688,1.584-1.888,1.584Zm8.8,5.76h2.432v-7.12l5.424,7.12h2.1v-11.2h-2.432v6.9l-5.248-6.9h-2.272Z"
                transform="translate(508 135)"
                fill="#FFF8F1"
              />
            </g>
          </svg>
          <div className="icon-abs-left w-[64px] h-[64px] translate-x-[-50%] translate-y-[-50%]">
            <Image
              src={unWrapToken.logoURI}
              alt="token"
              height={64}
              width={64}
            />
          </div>
          <div className="icon-abs-right w-[64px] h-[64px] translate-x-[50%] translate-y-[-50%]">
            <Image
              src={unWrapToken.logoURI}
              alt="token"
              height={64}
              width={64}
            />
          </div>
        </div>
        <InfoBanner>
          <span className="text-left font-semibold text-sm">
            The conversion ratio is 1:1
          </span>
          <span className="block text-sm font-light">
            Read more about wrapped tokens on the{' '}
            <span className="link">
              <Link href="wiki">Wiki</Link>
            </span>
          </span>
        </InfoBanner>
        <TokenInput
          handleShowModal={() => handleShowUnWrapModal(true)}
          amount={unWrapAmount}
          handleAmountChange={handleUnWrapAmountChange}
          token={unWrapToken}
        />
        <div className="flex justify-center border-0 my-4">
          <ArrowsDown />
        </div>
        <TokenInput
          amount={unWrapAmount}
          token={{
            ...unWrapToken,
            symbol: unWrapToken.symbol.replace('SP-', ''),
          }}
        />
        <div className="mt-8">
          <LoadingButton
            text={`UN-WRAP`}
            loading={unWrapLoading}
            onClick={() => onConvertUnWrapTokens()}
          />
        </div>
      </CardContainer>
    </div>
  )
}

Convert.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout padding={0}>
      <NavTab page="trade" />
      {page}
    </Layout>
  )
}

export default Convert
