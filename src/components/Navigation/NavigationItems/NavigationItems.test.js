import { configure, shallow } from "enzyme"
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import NavigationItems from '../NavigationItems/NavigationItems'
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem'
configure ({adapter:new Adapter})
describe('<NavigationItems/>',()=>{
    let wrapper
    beforeEach(()=>{
        wrapper = shallow(<NavigationItems />)
    })
it('should render two <Navigation /> elements if not authenticatet',()=>{

expect(wrapper.find(NavigationItem)).toHaveLength(2)

})
it('should render three <Navigation /> elements if is authenticatet',()=>{
    wrapper.setProps({isAuthenticate:true})
expect(wrapper.find(NavigationItem)).toHaveLength(3)

})
})