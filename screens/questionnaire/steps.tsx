import React from 'react';
import { SvgProps } from 'react-native-svg';

import SkinHairIcon from '../../assets/icons/skin-hair.svg';
import SkinSmoothIcon from '../../assets/icons/skin-smooth.svg';
import SkinGlowingIcon from '../../assets/icons/skin-glowing.svg';
import SkinWaterGlowingIcon from '../../assets/icons/skin-water-glowing.svg';
import CrossCircleIcon from '../../assets/icons/cross-circle.svg';
import WaterEmptyIcon from '../../assets/icons/water-empty.svg';
import WaterThirdIcon from '../../assets/icons/water-third.svg';
import WaterTwoThirdIcon from '../../assets/icons/water-twothird.svg';
import WaterFullIcon from '../../assets/icons/water-full.svg';
import CalendarMonthIcon from '../../assets/icons/calendar-month.svg';
import CalendarWeekIcon from '../../assets/icons/calendar-week.svg';
import ChatBubbleIcon from '../../assets/icons/chat-bubble.svg';
import SkinLotRashIcon from '../../assets/icons/skin-lot-rash.svg';
import SkinRashIcon from '../../assets/icons/skin-rash.svg';
import QuestionMarkIcon from '../../assets/icons/question-mark.svg';
import DiagnosticIcon from '../../assets/icons/diagnostic.svg';
import SkinAcneIcon from '../../assets/icons/skin-acne.svg';
import FaceReallyBad from '../../assets/icons/face-really-bad.svg';
import FaceBad from '../../assets/icons/face-bad.svg';
import FaceGood from '../../assets/icons/face-good.svg';
import colors from '../../utils/colors';

const steps = [
  {
    question: '회원님의 성별을\n알려주세요.',
    name: 'gender',
    options: [
      { label: '여성', value: 1 },
      { label: '남성', value: 2 },
    ],
    column: 2,
  },
  {
    question: '회원님의 나이를\n알려주세요.',
    name: 'age',
    options: [
      { label: '20세 미만', value: 0 },
      { label: '20세~24세', value: 1 },
      { label: '25세~29세', value: 2 },
      { label: '30세~34세', value: 3 },
      { label: '35세~40세', value: 4 },
      { label: '41세~50세', value: 5 },
      { label: '51세~60세', value: 6 },
      { label: '61세이상', value: 7 },
    ],
    column: 2,
  },
  {
    question:
      '세안 및 스킨케어 사용 후\n2~3시간이 경과한 피부상태를 알려주세요.',
    name: 'skinAfterSkincare',
    options: [
      {
        label: '각질이 일어나거나 주름이 깊어진다',
        value: 1,
        icon: (props?: SvgProps) => <SkinHairIcon {...props} />,
      },
      {
        label: '매끈하다',
        value: 2,
        icon: (props?: SvgProps) => <SkinSmoothIcon {...props} />,
      },
      {
        label: '윤기가 흐른다',
        value: 3,
        icon: (props?: SvgProps) => <SkinGlowingIcon {...props} />,
      },
      {
        label: '물기가 생기고 탄력이 있다',
        value: 4,
        icon: (props?: SvgProps) => <SkinWaterGlowingIcon {...props} />,
      },
      {
        label: '평소에 세안 후 스킨케어 제품을 바르지 않는다.',
        value: 5,
        icon: (props?: SvgProps) => <CrossCircleIcon {...props} />,
      },
    ],
    column: 1,
  },
  {
    question: '세안 후 2~3 시간 후 얼굴의 T존에\n번들거림이 느껴지시나요?',
    name: 'tZoneOil',
    options: [
      {
        label: '전혀없다',
        value: 1,
        icon: (props?: SvgProps) => <WaterEmptyIcon {...props} />,
      },
      {
        label: '때때로 있다',
        value: 2,
        icon: (props?: SvgProps) => (
          <WaterThirdIcon {...props} color="#fff5ce" />
        ),
      },
      {
        label: '자주 있다',
        value: 3,
        icon: (props?: SvgProps) => <WaterTwoThirdIcon {...props} />,
      },
      {
        label: '항상 있다',
        value: 4,
        icon: (props?: SvgProps) => <WaterFullIcon {...props} />,
      },
      {
        label: '없다',
        value: 5,
        icon: (props?: SvgProps) => <CrossCircleIcon {...props} />,
      },
    ],
    column: 1,
  },
  {
    question: '자기도 모르는 새 얼굴에 붉은 뾰루지가\n생겨난 적이 있으신가요?',
    name: 'pimple',
    options: [
      {
        label: '전혀없다',
        value: 1,
        icon: (props?: SvgProps) => <CrossCircleIcon {...props} />,
      },
      {
        label: '때때로 있다',
        value: 2,
        icon: (props?: SvgProps) => (
          <CrossCircleIcon {...props} color={colors.orange} />
        ),
      },
      {
        label: '자주 있다',
        value: 3,
        icon: (props?: SvgProps) => <CalendarMonthIcon {...props} />,
      },
      {
        label: '항상 있다',
        value: 4,
        icon: (props?: SvgProps) => <CalendarWeekIcon {...props} />,
      },
    ],
    column: 1,
  },
  {
    question:
      '피부염, 습진, 발진 등으로 피부과 진단을\n받은 적이 있습니까?',
    name: 'dermatitis',
    options: [
      {
        label: '없다',
        value: 1,
        icon: (props?: SvgProps) => <CrossCircleIcon {...props} />,
      },
      {
        label: '친구들이 나에게 질환이 있는 것 같다고 한다',
        value: 2,
        icon: (props?: SvgProps) => <ChatBubbleIcon {...props} />,
      },
      {
        label: '자주 있다',
        value: 3,
        icon: (props?: SvgProps) => <SkinLotRashIcon {...props} />,
      },
      {
        label: '심각한 경우에 해당한다',
        value: 4,
        icon: (props?: SvgProps) => <SkinRashIcon {...props} />,
      },
      {
        label: '잘 모르겠다',
        value: 5,
        icon: (props?: SvgProps) => <QuestionMarkIcon {...props} />,
      },
    ],
    column: 1,
  },
  {
    question:
      '회원님은 최근 5년 이내에 여드름에\n대한 진단을 받은 적이 있습니까?',
    name: 'acne',
    options: [
      {
        label: '없다',
        value: 1,
        icon: (props?: SvgProps) => <CrossCircleIcon {...props} />,
      },
      {
        label: '친구들이 나에게 질환이 있는 것 같다고 한다',
        value: 2,
        icon: (props?: SvgProps) => <ChatBubbleIcon {...props} />,
      },
      {
        label: '진단을 받았다',
        value: 3,
        icon: (props?: SvgProps) => <DiagnosticIcon {...props} />,
      },
      {
        label: '심각한 경우에 해당한다',
        value: 4,
        icon: (props?: SvgProps) => <SkinAcneIcon {...props} />,
      },
      {
        label: '잘 모르겠다',
        value: 5,
        icon: (props?: SvgProps) => <QuestionMarkIcon {...props} />,
      },
    ],
    column: 1,
  },
  {
    question: '화장품을 새 제품으로 교체하셨을 때 피부에 이상반응을 느끼신 적이 있으신가요?',
    name: 'skinReaction',
    options: [
      {
        label: '민감한 반응',
        value: 1,
        icon: (props?: SvgProps) => <FaceReallyBad {...props} />,
      },
      {
        label: '약간의 반응',
        value: 2,
        icon: (props?: SvgProps) => <FaceBad {...props} />,
      },
      {
        label: '없음',
        value: 3,
        icon: (props?: SvgProps) => <FaceGood {...props} />,
      },
    ],
    column: 3,
    direction: 'column',
  },
  {
    question: '회원님의 피부고민을 알려주세요.',
    name: 'concern',
    options: [
      { label: '유수분 밸런스 관련 고민 (과잉 피지, 수분 부족 등)', value: 1 },
      { label: '피부결 (과잉 각질, 피부 거칠기 등)', value: 2 },
      { label: '트러블 (민감도 상승으로 인한 피부 고민 등)', value: 3 },
      { label: '기타 (특별한 피부 고민 없음 포함)', value: 4 },
    ],
  },
  {
    question: '약관동의',
    description: '닥터리진 서비스를 이용하기 위해\n다음 내용에 동의해주세요!',
  },
  {
    question: '회원가입을 진심으로\n감사드립니다 :)',
    description:
      '이제 회원님의 피부를 재미있게 알아가고 잘\n케어되도록 저희 닥터리진이 돕겠습니다.\n회원님만의 솔루션을 제안해드립니다.',
  },
];

export default steps;
