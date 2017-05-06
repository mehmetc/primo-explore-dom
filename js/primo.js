import Explore from './primo/explore'
import Records from './primo/records'
import Facets from './primo/facets'
import View from './primo/view'
import User from './primo/user'
import Helper from './primo/explore/helper'

/**
 * Primo main entry class
 */
export default class Primo {
  /**
   * Return version information
   * @return {string}
   */
  static get version() {
    return "0.0.6";
  }

  /**
   * Check if angular.reloadWithDebugInfo() has ran
   * @return {boolean}
   */
  static isDebugEnabled() {
    return Helper.isDebugEnabled();
  }

  /**
   * Did the script ran on a Primo site
   * @return {boolean}
   */
  static isPrimoAvailable() {
    return Helper.isPrimoAvailable();
  }

  /**
   * This is a proxy class
   * @return {Explore}
   */
  static get explore() {
    return Explore;
  }

  /**
   * Get a pointer to available records
   * @return {Records}
   */
  static get records(){
    return new Promise((resolve, reject) => {
      resolve(new Records(this.explore.components));
    })
    //return new Records(this.explore.components);
  }

  /**
   * Get a pointer to available facets
   * @return {Facets}
   */
  static get facets(){
    return new Promise((resolve, reject) => {
      resolve(new Facets(this.explore.components));
    })
    //return new Facets(this.explore.components);
  }

  /**
   * Get a pointer to view related metadata
   * @return {View}
   */
  static get view() {
    return new Promise((resolve, reject) => {
      resolve(new View());
    })
    //return new View();
  }

  /**
   * Get a pointer to user related metadata
   * @return {User}
   */
  static get user() {
    return new Promise((resolve, reject) => {
      Helper.userDetails().then((userDetails)=>{
        resolve(new User(userDetails));
      });
    });
  }
}
